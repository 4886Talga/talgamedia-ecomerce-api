const express = require("express");
const reviewsController = require("../../controllers/reviews.controller");
const {
  authorizeAccess,
  authorizeAdmin,
} = require("../../middleware/handleCurrentUser");
const { validateReview } = require("../../middleware/validate");
const {
  checkProduct,
  checkUsersReview,
} = require("../../middleware/handleRiview");

const router = express.Router({ mergeParams: true });

router.get("/", reviewsController.getAllProductReviews);
router.post(
  "/",
  authorizeAccess,
  validateReview,
  checkProduct,
  checkUsersReview,
  reviewsController.addReview
);

module.exports = router;
