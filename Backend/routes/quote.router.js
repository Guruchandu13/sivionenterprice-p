const express = require("express");
const router = express.Router();

const {
  createQuoteRequest,
  getAllQuoteRequests,
  getQuoteRequestById,
  updateOwnQuoteRequest,
  deleteQuoteRequest,
} = require("../controllers/quote.controller");

const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const verifyRecaptcha = require("../middleware/recaptcha.middleware");

// User routes
router.post("/", verifyRecaptcha, createQuoteRequest);
router.put("/:id", verifyRecaptcha, updateOwnQuoteRequest);

// Admin routes
router.get("/", protect, authorizeRoles("admin"), getAllQuoteRequests);
router.get("/:id", protect, authorizeRoles("admin"), getQuoteRequestById);
router.delete("/:id", protect, authorizeRoles("admin"), deleteQuoteRequest);

module.exports = router;