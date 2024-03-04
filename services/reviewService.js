const { Review } = require("../prisma/initDB");

module.exports.createReview = async (data) => {
  return await Review.create({
    data: data,
  });
};

module.exports.fetchReviewsByProductId = async (productId) => {
  return await Review.findMany({
    where: {
      productId: productId,
    },
  });
};

module.exports.fetchReviewByUserAndProductId = async (userId, productId) => {
  return await Review.findUnique({
    where: {
      userId: userId,
      productId: productId,
    },
  });
};

module.exports.updateReviewById = async (reviewId, data) => {
  return await Review.update({
    where: {
      id: reviewId,
    },
    data: data,
  });
};
