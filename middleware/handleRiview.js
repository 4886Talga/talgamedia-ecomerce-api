const { fetchReviewByUserAndProductId } = require("../services/reviewService");
const { fetchProductForReview } = require("../services/productService");
const { NotFound } = require("../utils/errorResponse");

module.exports.checkProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await fetchProductForReview(productId);
    if (!product) throw new NotFound("Product not found");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.checkUsersReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { title, year, rating, content } = req.body;

    const review = await fetchReviewByUserAndProductId(userId, productId);

    if (review) {
      req.oldReview = review;
    }

    req.newReview = {
      productId: productId,
      userId: userId,
      title: title,
      year: year,
      content: content,
      rating: rating,
    };
    next();
  } catch (error) {
    next(error);
  }
};
