const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  forgotPassword,
  resetPasswordWithOtp,
} = require("../controllers/auth.controller");

router.post("/admin/login", loginAdmin);
router.post("/admin/forgot-password", forgotPassword);
router.post("/admin/reset-password", resetPasswordWithOtp);

module.exports = router;