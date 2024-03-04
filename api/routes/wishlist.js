const express = require("express");
const wishlistController = require("../../controllers/wishlist.controller");
const {
  authorizeAccess,
  authorizeAdmin,
} = require("../../middleware/handleCurrentUser");
const {
  checkProduct,
  checkUsersReview,
} = require("../../middleware/handleWishlist");

const router = express.Router({ mergeParams: true });

router.get("/", authorizeAccess, wishlistController.getUsersWishlist);
router.post(
  "/add",
  authorizeAccess,
  checkProduct,
  wishlistController.addProductToUsersWishList
);
router.put(
  "/remove",
  authorizeAccess,
  checkProduct,
  wishlistController.removeFromWishlist
);

module.exports = router;
