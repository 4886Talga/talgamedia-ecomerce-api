const { PrismaClient } = require("@prisma/client");
const {
  fetchTrackingkByOrderId,
  updateTrackingStatusByOrderId,
} = require("../services/trackingOrderService");
const { NotFound } = require("../utils/errorResponse");

const prisma = new PrismaClient();

const getTracking = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const track = await fetchTrackingkByOrderId(orderId);
    if (!track) throw new NotFound("Track not found for this order");

    res.status(201).json({
      success: true,
      message: "Track fetched succesfully",
      track: track,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateTracking = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedTrack = await updateTrackingStatusByOrderId(orderId, status);

    res.status(200).json({
      success: true,
      message: "Track updated succesfully",
      updatedTrack,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getTracking,
  updateTracking,
};
