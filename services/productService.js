const { Product } = require("../prisma/initDB");

const createProduct = async (product) => {
  return await Product.create({
    data: product,
  });
};

const fetchProduct = async (productId) => {
  return await Product.findUnique({
    where: {
      id: productId,
    },
    include: {
      categories: { select: { name: true } },
      review: true,
    },
  });
};

const fetchProductsWithPagination = async (options) => {
  let products;

  products = await Product.findMany(options);

  return products;
};

const fetchProductForCart = async (productId) => {
  return await Product.findUnique({
    where: {
      id: productId,
    },
    select: {
      name: true,
      price: true,
      countInStock: true,
    },
  });
};

const fetchProductForReview = async (productId) => {
  return await Product.findUnique({
    where: {
      id: productId,
    },
    select: {
      review: true,
    },
  });
};

const fetchProductForWishlist = async (productId) => {
  return await Product.findUnique({
    where: {
      id: productId,
    },
    select: {
      wishlists: true,
    },
  });
};

const productStockUpdate = async (productId, stock) => {
  return await Product.update({
    where: {
      id: productId,
    },
    data: {
      countInStock: {
        increment: stock,
      },
    },
  });
};
const productUpdate = async (productId, data) => {
  return await Product.update({
    where: {
      id: productId,
    },
    data: data,
  });
};
const removeProduct = async (productId) => {
  return await Product.delete({
    where: {
      id: productId,
    },
  });
};

module.exports = {
  createProduct,
  fetchProduct,
  fetchProductsWithPagination,
  productStockUpdate,
  productUpdate,
  fetchProductForCart,
  fetchProductForReview,
  fetchProductForWishlist,
  removeProduct,
};
