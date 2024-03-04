const express = require("express");

const {
  setCartItemInc,
  removeCartItemDec,
  removeCartItem,
  getCart,
  removeCart,
  addItemToCart,
  subtractItemFromCart,
} = require("../../controllers/cart.controller");
const { authorizeAccess } = require("../../middleware/handleCurrentUser");
const {
  checkProductAvailablity,
  checkCurrentUserCart,
  checkCartItemAvailablity,
} = require("../../middleware/handleCart");

const router = express.Router();

router.get("/", getCart);
router.delete("/", removeCart);

router.post("/add/:productId", authorizeAccess, addItemToCart);

router.delete("/sub/:productId", authorizeAccess, subtractItemFromCart);

module.exports = router;
