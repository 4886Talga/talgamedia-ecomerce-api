const { TrackingInfo } = require("../prisma/initDB");

const fetchTrackingByOrderId = async (orderId) => {
  return await TrackingInfo.findUnique({
    where: {
      orderId: orderId,
    },
  });
};

const updateTrackingStatusByOrderId = async (orderId, status) => {
  return await TrackingInfo.update({
    where: {
      orderId: orderId,
    },
    data: {
      status: status,
    },
  });
};

module.exports = {
  fetchTrackingByOrderId,
  updateTrackingStatusByOrderId,
};
