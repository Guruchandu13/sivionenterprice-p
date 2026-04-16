const Subscriber = require("../models/subscriber.model");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");

exports.subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return errorResponse(res, 400, "Email is required");
  }

  const existingSubscriber = await Subscriber.findOne({ email });

  if (existingSubscriber) {
    return errorResponse(res, 400, "Email is already subscribed");
  }

  const subscriber = await Subscriber.create({
    email,
    subscribedAt: new Date(),
  });

  return successResponse(res, 201, "Subscribed successfully", subscriber);
});

exports.getAllSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });

  return successResponse(
    res,
    200,
    "Subscribers fetched successfully",
    subscribers
  );
});