const User = require("../models/user.model");

const seedDefaultAdmin = async () => {
  try {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    const adminName = process.env.DEFAULT_ADMIN_NAME || "Super Admin";

    if (!adminEmail || !adminPassword) {
      console.log("Default admin credentials are not configured in .env");
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Default admin already exists");
      return;
    }

    await User.create({
      fullName: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    console.log("Default admin created successfully");
  } catch (error) {
    console.log("Failed to seed default admin:", error.message);
  }
};

module.exports = seedDefaultAdmin;