const Project = require("../models/project.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");

exports.getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ status: "published" }).sort({
    createdAt: -1,
  });

  return successResponse(res, 200, "Projects fetched successfully", projects);
});

exports.getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.status !== "published") {
    return errorResponse(res, 404, "Project not found");
  }

  return successResponse(res, 200, "Project fetched successfully", project);
});

exports.getAllProjectsForAdmin = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });

  return successResponse(
    res,
    200,
    "All projects fetched successfully",
    projects
  );
});

exports.createProject = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    shortDescription,
    fullDescription,
    clientName,
    industry,
    technologies,
    projectUrl,
    githubUrl,
    coverImage,
    galleryImages,
    status,
    featured,
    completionDate,
  } = req.body;

  if (!title || !slug || !shortDescription || !fullDescription) {
    return errorResponse(
      res,
      400,
      "Title, slug, short description, and full description are required"
    );
  }

  const existingProject = await Project.findOne({ slug });

  if (existingProject) {
    return errorResponse(res, 400, "Project slug already exists");
  }

  const project = await Project.create({
    title,
    slug,
    shortDescription,
    fullDescription,
    clientName,
    industry,
    technologies: Array.isArray(technologies) ? technologies : [],
    projectUrl,
    githubUrl,
    coverImage,
    galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
    status,
    featured,
    completionDate,
  });

  return successResponse(res, 201, "Project created successfully", project);
});

exports.updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return errorResponse(res, 404, "Project not found");
  }

  Object.assign(project, req.body);

  if (req.body.technologies && !Array.isArray(req.body.technologies)) {
    project.technologies = [];
  }

  if (req.body.galleryImages && !Array.isArray(req.body.galleryImages)) {
    project.galleryImages = [];
  }

  const updatedProject = await project.save();

  return successResponse(
    res,
    200,
    "Project updated successfully",
    updatedProject
  );
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return errorResponse(res, 404, "Project not found");
  }

  await project.deleteOne();

  return successResponse(res, 200, "Project deleted successfully");
});