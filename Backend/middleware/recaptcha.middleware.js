const axios = require("axios");

const verifyRecaptcha = async (req, res, next) => {
  try {
    const { recaptchaToken } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA token is required",
      });
    }

    if (!process.env.RECAPTCHA_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "reCAPTCHA secret key is not configured",
      });
    }

    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    params.append("response", recaptchaToken);

    const { data } = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid reCAPTCHA verification",
        errors: data["error-codes"] || [],
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "reCAPTCHA verification failed",
      error: error.message,
    });
  }
};

module.exports = verifyRecaptcha;