const { fetchProductForCart } = require("../services/productService");
const {
  createEmptyCart,
  fetchCartAndItems,
  chexkExistingCartItem,
} = require("../services/cartService");
const { NotFound } = require("../utils/errorResponse");

const checkCurrentUserCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let cart = await fetchCartAndItems(userId);
    if (!cart) {
      cart = createEmptyCart();
    }

    req.cart = cart;
    next();
  } catch (error) {
    next(error);
  }
};

const checkCartItemAvailablity = async (req, res, next) => {
  try {
    const { cart } = req;
    const { productId } = req.params;
    const existingCartItem = chexkExistingCartItem(cart.id, productId);

    req.availablity = existingCartItem ? true : false;

    next();
  } catch (error) {
    next(error);
  }
};

const checkProductAvailablity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await fetchProductForCart(productId);

    if (!product) {
      throw new NotFound("Product not available");
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkProductAvailablity,
  checkCartItemAvailablity,
  checkCurrentUserCart,
};
