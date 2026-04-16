const express = require("express");
const router = express.Router();

const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/inquiry.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");

// Public create
router.post("/", createInquiry);

// Admin CRUD except create
router.get("/", protect, authorizeRoles("admin"), getAllInquiries);
router.get("/:id", protect, authorizeRoles("admin"), getInquiryById);
router.put("/:id", protect, authorizeRoles("admin"), updateInquiryStatus);
router.delete("/:id", protect, authorizeRoles("admin"), deleteInquiry);

module.exports = router;