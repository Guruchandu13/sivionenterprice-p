const express = require("express");
const router = express.Router();

const {
  getAllActiveJobs,
  getJobById,
  getAllJobsForAdmin,
  createJob,
  updateJob,
  toggleJobStatus,
  deleteJob,
} = require("../controllers/job.controller");

const { protect } = require("../middleware/auth.middleware");

// ADMIN ONLY
router.get("/admin/all", protect, getAllJobsForAdmin);
router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.patch("/:id/toggle", protect, toggleJobStatus);
router.delete("/:id", protect, deleteJob);

// PUBLIC
router.get("/", getAllActiveJobs);
router.get("/:id", getJobById);

module.exports = router;