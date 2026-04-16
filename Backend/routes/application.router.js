const express = require("express");
const router = express.Router();

const {
  submitApplication,
  getApplicationById,
  updateOwnApplication,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/application.controller");

const { protect } = require("../middleware/auth.middleware");
const uploadResume = require("../config/multer");

// PUBLIC: Submit application
router.post("/", uploadResume.single("resume"), submitApplication);

// PUBLIC: Get single application
router.get("/:id", getApplicationById);

// PUBLIC: Update own application
router.put("/:id", uploadResume.single("resume"), updateOwnApplication);

// ADMIN ONLY: Get all applications
router.get("/", protect, getAllApplications);

// ADMIN ONLY: Update application status
router.patch("/:id/status", protect, updateApplicationStatus);

// ADMIN ONLY: Delete application
router.delete("/:id", protect, deleteApplication);

module.exports = router;