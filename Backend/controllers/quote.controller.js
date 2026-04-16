const Quote = require("../models/quote.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");

exports.createQuoteRequest = asyncHandler(async (req, res) => {
  const {
    requestType,
    fullName,
    email,
    phone,
    company,
    serviceType,
    budget,
    projectDetails,
    preferredDate,
    preferredTime,
  } = req.body;

  if (!fullName || !email || !serviceType || !projectDetails) {
    return errorResponse(
      res,
      400,
      "Full name, email, service type, and project details are required"
    );
  }

  const quote = await Quote.create({
    submittedBy: req.user ? req.user._id : undefined,
    requestType,
    fullName,
    email,
    phone,
    company,
    serviceType,
    budget,
    projectDetails,
    preferredDate,
    preferredTime,
  });

  return successResponse(
    res,
    201,
    `${
      requestType === "consultation" ? "Consultation" : "Quote"
    } request submitted successfully`,
    quote
  );
});

exports.getAllQuoteRequests = asyncHandler(async (req, res) => {
  const quotes = await Quote.find()
    .populate("submittedBy", "fullName email role")
    .sort({ createdAt: -1 });

  return successResponse(res, 200, "Requests fetched successfully", quotes);
});

exports.getQuoteRequestById = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id).populate(
    "submittedBy",
    "fullName email role"
  );

  if (!quote) {
    return errorResponse(res, 404, "Request not found");
  }

  return successResponse(res, 200, "Request fetched successfully", quote);
});

exports.updateOwnQuoteRequest = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    return errorResponse(res, 404, "Request not found");
  }

  if (
    !quote.submittedBy ||
    quote.submittedBy.toString() !== req.user._id.toString()
  ) {
    return errorResponse(
      res,
      403,
      "Forbidden: You can update only your own request"
    );
  }

  const allowedFields = [
    "requestType",
    "fullName",
    "email",
    "phone",
    "company",
    "serviceType",
    "budget",
    "projectDetails",
    "preferredDate",
    "preferredTime",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      quote[field] = req.body[field];
    }
  });

  const updatedQuote = await quote.save();

  return successResponse(
    res,
    200,
    "Request updated successfully",
    updatedQuote
  );
});

exports.deleteQuoteRequest = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    return errorResponse(res, 404, "Request not found");
  }

  await quote.deleteOne();

  return successResponse(res, 200, "Request deleted successfully");
});