const { PrismaClient } = require("@prisma/client");
const ErrorResponse = require("../utils/errorResponse");
const {
  addProduct,
  getUserWishlist,
  removeProductFromWishlist,
} = require("../services/wishlistService");

// Add a product to a user's wishlist
async function addProductToUsersWishList(req, res, next) {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const wishlist = await addProduct(userId, productId);

    res.status(201).json({
      success: true,
      message: "Product added to wishlist succesfully",
      createdProduct: wishlist,
    });
  } catch (error) {
    next(error);
  }
}

//Get Users product wishlist
async function getUsersWishlist(req, res, next) {
  const userId = req.user.id;

  try {
    const usersWishList = await getUserWishlist(userId);

    res.status(201).json({
      success: true,
      message: "Wishlist fetched succesfully",
      fetchedWishlist: usersWishList,
    });
  } catch (error) {
    next(error);
  }
}

// Remove product from wishlist
async function removeFromWishlist(req, res, next) {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const usersWishList = await removeProductFromWishlist(userId, productId);

    res.status(201).json({
      success: true,
      message: "Product succesfully removed from wishlist!",
      updatedWishlist: usersWishList,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addProductToUsersWishList,
  getUsersWishlist,
  removeFromWishlist,
};
