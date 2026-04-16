const Blog = require("../models/blog.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");

exports.getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
  return successResponse(res, 200, "Blogs fetched successfully", blogs);
});

exports.getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return errorResponse(res, 404, "Blog not found");
  }

  return successResponse(res, 200, "Blog fetched successfully", blog);
});

exports.createBlog = asyncHandler(async (req, res) => {
  const { title, slug, summary, content, authorName, coverImage, category, isPublished } = req.body;

  if (!title || !slug || !summary || !content) {
    return errorResponse(res, 400, "Title, slug, summary, and content are required");
  }

  const existingBlog = await Blog.findOne({ slug });
  if (existingBlog) {
    return errorResponse(res, 400, "Slug already exists");
  }

  const blog = await Blog.create({
    title,
    slug,
    summary,
    content,
    authorName,
    coverImage,
    category,
    isPublished,
  });

  return successResponse(res, 201, "Blog created successfully", blog);
});

exports.updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return errorResponse(res, 404, "Blog not found");
  }

  Object.assign(blog, req.body);
  const updatedBlog = await blog.save();

  return successResponse(res, 200, "Blog updated successfully", updatedBlog);
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return errorResponse(res, 404, "Blog not found");
  }

  await blog.deleteOne();

  return successResponse(res, 200, "Blog deleted successfully");
});