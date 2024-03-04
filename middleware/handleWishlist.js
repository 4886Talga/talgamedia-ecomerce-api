const { fetchReviewByUserAndProductId } = require("../services/reviewService");
const { fetchProductForWishlist } = require("../services/productService");
const { NotFound } = require("../utils/errorResponse");

module.exports.checkProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const product = await fetchProductForWishlist(productId);
    if (!product) throw new NotFound("Product not found");
    next();
  } catch (error) {
    next(error);
  }
};
