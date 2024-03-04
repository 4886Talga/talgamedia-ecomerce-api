const {
  createReview,
  updateReviewById,
  fetchReviewsByProductId,
} = require("../services/reviewService");
const { fetchProduct } = require("../services/productService");

async function getAllProductReviews(req, res, next) {
  try {
    const { productId } = req.params;
    const reviews = await fetchReviewsByProductId(productId);

    res.status(200).json({
      success: true,
      message: reviews,
    });
  } catch (error) {
    next(error);
  }
}

async function addReview(req, res, next) {
  try {
    const oldReview = req.oldReview;
    const newReview = req.newReview;

    if (oldReview) {
      const updatedReview = await updateReviewById(oldReview.id, newReview);

      return res.status(201).json({
        success: true,
        message: `Review updated ID: ${updatedReview.id}`,
      });
    }

    const review = await createReview(newReview);

    res.status(201).json({
      success: true,
      message: `Review created by ID: ${review.id}`,
    });
  } catch (error) {
    if (error.code === "P2002" || error.code === "P2004") {
      next(
        new Error(
          "Cannot add multiple reviews for the same product by the same user"
        )
      );
    } else {
      next(error);
    }
  }
}

module.exports = {
  getAllProductReviews,
  addReview,
};
