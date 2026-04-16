const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin only",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// Forgot password - send OTP to admin email
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forgot password is allowed for admin only",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otpCode = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    await sendEmail({
      to: user.email,
      subject: "Admin Password Reset OTP - Sivion EnterpriseTech Hub",
      text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f4f8fb; padding: 30px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; padding: 30px; border: 1px solid #dbe4ee;">
            <h2 style="color: #0f172a; margin-bottom: 10px;">Sivion EnterpriseTech Hub</h2>
            <p style="font-size: 16px; color: #334155;">Hello ${user.fullName || "Admin"},</p>
            <p style="font-size: 16px; color: #334155;">
              Your OTP for admin password reset is:
            </p>
            <h1 style="letter-spacing: 6px; text-align: center; color: #06b6d4; margin: 30px 0;">
              ${otp}
            </h1>
            <p style="font-size: 15px; color: #475569;">
              This OTP is valid for <strong>10 minutes</strong>.
            </p>
            <p style="font-size: 15px; color: #475569;">
              If you did not request this, please ignore this email.
            </p>
            <hr style="margin: 25px 0; border: none; border-top: 1px solid #e2e8f0;" />
            <p style="font-size: 14px; color: #64748b;">
              Regards,<br />
              Sivion EnterpriseTech Hub Team
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to admin email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

// Verify OTP + reset password
exports.resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required",
      });
    }

    const user = await User.findOne({
      email,
      otpCode: otp,
      otpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Password reset is allowed for admin only",
      });
    }

    user.password = newPassword;
    user.otpCode = null;
    user.otpExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Password reset failed",
      error: error.message,
    });
  }
};