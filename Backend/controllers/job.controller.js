const Job = require("../models/job.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");


// PUBLIC: Get all active jobs

exports.getAllActiveJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });

  return successResponse(res, 200, "Active jobs fetched successfully", jobs);
});


// PUBLIC: Get single active job by id

exports.getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.id,
    isActive: true,
  });

  if (!job) {
    return errorResponse(res, 404, "Job not found");
  }

  return successResponse(res, 200, "Job fetched successfully", job);
});

// ADMIN ONLY: Get all jobs

exports.getAllJobsForAdmin = asyncHandler(async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });

  return successResponse(res, 200, "All jobs fetched successfully", jobs);
});


// ADMIN ONLY: Create job

exports.createJob = asyncHandler(async (req, res) => {
  const {
    title,
    department,
    location,
    type,
    description,
    requirements,
    isActive,
  } = req.body;

  if (!title || !department || !location || !type || !description) {
    return errorResponse(
      res,
      400,
      "Title, department, location, type, and description are required"
    );
  }

  const job = await Job.create({
    title,
    department,
    location,
    type,
    description,
    requirements: Array.isArray(requirements)
      ? requirements
      : typeof requirements === "string"
      ? requirements.split(",").map((item) => item.trim())
      : [],
    isActive,
  });

  return successResponse(res, 201, "Job created successfully", job);
});


// ADMIN ONLY: Update job

exports.updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return errorResponse(res, 404, "Job not found");
  }

  const {
    title,
    department,
    location,
    type,
    description,
    requirements,
    isActive,
  } = req.body;

  if (title !== undefined) job.title = title;
  if (department !== undefined) job.department = department;
  if (location !== undefined) job.location = location;
  if (type !== undefined) job.type = type;
  if (description !== undefined) job.description = description;
  if (isActive !== undefined) job.isActive = isActive;

  if (requirements !== undefined) {
    job.requirements = Array.isArray(requirements)
      ? requirements
      : typeof requirements === "string"
      ? requirements.split(",").map((item) => item.trim())
      : [];
  }

  const updatedJob = await job.save();

  return successResponse(res, 200, "Job updated successfully", updatedJob);
});


// ADMIN ONLY: Toggle job status

exports.toggleJobStatus = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return errorResponse(res, 404, "Job not found");
  }

  job.isActive = !job.isActive;

  const updatedJob = await job.save();

  return successResponse(
    res,
    200,
    `Job ${updatedJob.isActive ? "activated" : "deactivated"} successfully`,
    updatedJob
  );
});

// ADMIN ONLY: Delete job

exports.deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return errorResponse(res, 404, "Job not found");
  }

  await job.deleteOne();

  return successResponse(res, 200, "Job deleted successfully");
});