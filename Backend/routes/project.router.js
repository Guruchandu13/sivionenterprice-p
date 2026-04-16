const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProjectById,
  getAllProjectsForAdmin,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");

router.get("/admin/all", protect, authorizeRoles("admin"), getAllProjectsForAdmin);
// Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.post("/", protect, authorizeRoles("admin"), createProject);
router.put("/:id", protect, authorizeRoles("admin"), updateProject);
router.delete("/:id", protect, authorizeRoles("admin"), deleteProject);

module.exports = router;