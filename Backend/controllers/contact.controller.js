const Contact = require("../models/contact.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");

exports.submitContact = asyncHandler(async (req, res) => {
  const { fullName, email, subject, message, phone, company } = req.body;

  if (!fullName || !email || !subject || !message) {
    return errorResponse(res, 400, "Full name, email, subject, and message are required");
  }

  const contact = await Contact.create({
    fullName,
    email,
    subject,
    message,
    phone,
    company,
  });

  return successResponse(res, 201, "Contact form submitted successfully", contact);
});

exports.getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return successResponse(res, 200, "Contacts fetched successfully", contacts);
});

exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return errorResponse(res, 404, "Contact record not found");
  }

  await contact.deleteOne();

  return successResponse(res, 200, "Contact record deleted successfully");
});