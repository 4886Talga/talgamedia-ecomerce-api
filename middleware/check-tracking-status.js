const { fetchTrackByOrderId } = require("../services/trackingOrderService");
const { BadRequest, NotFound } = require("../utils/errorResponse");

//Track Status
const orderTrackStatus = {
  preparing: "PREPARING",
  shipped: "SHIPPED",
  deliverd: "DELIVERD",
};

const checkTrackStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const track = await fetchTrackByOrderId(orderId);
    if (!track) throw new NotFound("Track not found");
    if (track.status === deliverd)
      throw new BadRequest("Order is already deliverd");
    if (
      status === orderTrackStatus.preparing ||
      status === orderTrackStatus.shipped ||
      status === orderTrackStatus.deliverd
    ) {
      next();
    } else {
      throw new BadRequest("Invalid Track Status");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkTrackStatus,
};
