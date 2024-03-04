const { Wishlist, User } = require("../prisma/initDB");

const addProduct = async (userId, productId) => {
  return await Wishlist.upsert({
    where: { userId },
    update: {
      products: {
        connect: { id: productId },
      },
    },
    create: {
      userId,
      products: {
        connect: { id: productId },
      },
    },
    include: { products: true },
  });
};
const getUserWishlist = async (userId) => {
  return await User.findUnique({
    where: { id: userId },
    include: { wishlist: { include: { products: true } } },
  });
};

const removeProductFromWishlist = async (userId, productId) => {
  return await Wishlist.update({
    where: { userId },
    data: {
      products: {
        disconnect: { id: productId },
      },
    },
    include: { products: true },
  });
};

module.exports = {
  addProduct,
  getUserWishlist,
  removeProductFromWishlist,
};
