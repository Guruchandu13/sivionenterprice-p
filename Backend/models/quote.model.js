const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    requestType: {
      type: String,
      enum: ["quote", "consultation"],
      default: "quote",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    company: {
      type: String,
      default: "",
      trim: true,
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: String,
      default: "",
      trim: true,
    },
    projectDetails: {
      type: String,
      required: true,
      trim: true,
    },
    preferredDate: {
      type: String,
      default: "",
      trim: true,
    },
    preferredTime: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "quoted", "scheduled", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);