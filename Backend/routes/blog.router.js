const express = require("express");
const router = express.Router();

const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");

// Public read
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Admin CRUD
router.post("/", protect, authorizeRoles("admin"), createBlog);
router.put("/:id", protect, authorizeRoles("admin"), updateBlog);
router.delete("/:id", protect, authorizeRoles("admin"), deleteBlog);

module.exports = router;