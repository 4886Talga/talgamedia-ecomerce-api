const express = require("express");
const {
  getTracking,
  updateTracking,
} = require("../../controllers/tracking.controller");
const { checkAuth, authorize } = require("../../middleware/check-auth");
const { validateTrack } = require("../../middleware/validate");
const { checkTrackStatus } = require("../../middleware/check-tracking-status");

const router = express.Router({ mergeParams: true });

router
  .route("/:orderId")
  .post(checkAuth, getTracking)
  .patch(
    checkAuth,
    authorize("ADMIN"),
    validateTrack,
    checkTrackStatus,
    updateTracking
  );

module.exports = router;
