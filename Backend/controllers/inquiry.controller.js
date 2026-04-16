const Inquiry = require("../models/inquiry.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");

exports.createInquiry = asyncHandler(async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    return errorResponse(
      res,
      400,
      "Full name, email, subject, and message are required"
    );
  }

  const inquiry = await Inquiry.create({
    fullName,
    email,
    subject,
    message,
  });

  return successResponse(res, 201, "Inquiry submitted successfully", inquiry);
});

exports.getAllInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  return successResponse(res, 200, "Inquiries fetched successfully", inquiries);
});

exports.getInquiryById = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return errorResponse(res, 404, "Inquiry not found");
  }

  return successResponse(res, 200, "Inquiry fetched successfully", inquiry);
});

exports.updateInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return errorResponse(res, 404, "Inquiry not found");
  }

  inquiry.status = req.body.status || inquiry.status;
  const updatedInquiry = await inquiry.save();

  return successResponse(
    res,
    200,
    "Inquiry status updated successfully",
    updatedInquiry
  );
});

exports.deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return errorResponse(res, 404, "Inquiry not found");
  }

  await inquiry.deleteOne();

  return successResponse(res, 200, "Inquiry deleted successfully");
});