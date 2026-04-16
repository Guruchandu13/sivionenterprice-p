const streamifier = require("streamifier");
const Application = require("../models/application.model");
const Job = require("../models/job.model");
const cloudinary = require("../config/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");


// HELPER: Upload resume to Cloudinary

const uploadResumeToCloudinary = (fileBuffer, originalname) => {
  return new Promise((resolve, reject) => {
    const safeBaseName = originalname
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-");

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "career_resumes",
        resource_type: "raw",
        public_id: `resume-${Date.now()}-${safeBaseName}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};


// PUBLIC: Submit application

exports.submitApplication = asyncHandler(async (req, res) => {
  const { jobId, fullName, email, phone, experience, skills } = req.body;

  if (!jobId || !fullName || !email || !phone) {
    return errorResponse(
      res,
      400,
      "Job, full name, email, and phone are required"
    );
  }

  const job = await Job.findById(jobId);

  if (!job || !job.isActive) {
    return errorResponse(res, 404, "Job not found or inactive");
  }

  let resumeUrl = "";

  if (req.file) {
    const uploadedFile = await uploadResumeToCloudinary(
      req.file.buffer,
      req.file.originalname
    );
    resumeUrl = uploadedFile.secure_url;
  }

  const application = await Application.create({
    jobId,
    fullName,
    email,
    phone,
    experience,
    skills: Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills.split(",").map((item) => item.trim())
      : [],
    resumeUrl,
    status: "pending",
    appliedAt: new Date(),
  });

  const populatedApplication = await Application.findById(application._id).populate(
    "jobId",
    "title department location type"
  );

  return successResponse(
    res,
    201,
    "Application submitted successfully",
    populatedApplication
  );
});


// PUBLIC: Get single application by id

exports.getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id).populate(
    "jobId",
    "title department location type description requirements isActive"
  );

  if (!application) {
    return errorResponse(res, 404, "Application not found");
  }

  return successResponse(
    res,
    200,
    "Application fetched successfully",
    application
  );
});


// PUBLIC: Update application
// - allowed only when status = pending
// - email must match existing application email

exports.updateOwnApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return errorResponse(res, 404, "Application not found");
  }

  if (application.status !== "pending") {
    return errorResponse(
      res,
      400,
      "Application cannot be edited after review has started"
    );
  }

  const { fullName, email, phone, experience, skills } = req.body;

  if (!email) {
    return errorResponse(
      res,
      400,
      "Email is required to update application"
    );
  }

  if (application.email !== email) {
    return errorResponse(
      res,
      403,
      "Forbidden: You can update only your own application"
    );
  }

  if (fullName !== undefined) application.fullName = fullName;
  if (phone !== undefined) application.phone = phone;
  if (experience !== undefined) application.experience = experience;

  if (skills !== undefined) {
    application.skills = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills.split(",").map((item) => item.trim())
      : [];
  }

  if (req.file) {
    const uploadedFile = await uploadResumeToCloudinary(
      req.file.buffer,
      req.file.originalname
    );
    application.resumeUrl = uploadedFile.secure_url;
  }

  const updatedApplication = await application.save();

  return successResponse(
    res,
    200,
    "Application updated successfully",
    updatedApplication
  );
});


// ADMIN ONLY: Get all applications

exports.getAllApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find()
    .populate("jobId", "title department location type isActive")
    .sort({ createdAt: -1 });

  return successResponse(
    res,
    200,
    "Applications fetched successfully",
    applications
  );
});


// ADMIN ONLY: Update application status

exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = ["pending", "reviewed", "rejected", "hired"];

  if (!status || !allowedStatuses.includes(status)) {
    return errorResponse(
      res,
      400,
      "Valid status is required: pending, reviewed, rejected, hired"
    );
  }

  const application = await Application.findById(req.params.id);

  if (!application) {
    return errorResponse(res, 404, "Application not found");
  }

  application.status = status;

  const updatedApplication = await application.save();

  return successResponse(
    res,
    200,
    "Application status updated successfully",
    updatedApplication
  );
});


// ADMIN ONLY: Delete application

exports.deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return errorResponse(res, 404, "Application not found");
  }

  await application.deleteOne();

  return successResponse(res, 200, "Application deleted successfully");
});