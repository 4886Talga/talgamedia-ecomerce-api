const { PrismaClient } = require("@prisma/client");
var url = require("url");
const {
  createProduct,
  fetchProduct,
  fetchProductsWithPagination,
  productStockUpdate,
  productUpdate,
  removeProduct,
} = require("../services/productService");
const { Conflict, NotFound } = require("../utils/errorResponse");

const { Product } = require("../prisma/initDB");

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
const PER_PAGE = 5;

async function getAllProducts(req, res, next) {
  try {
    const count = await Product.count();
    const {
      items,
      orderdir,
      orderby,
      category,
      search,
      currentPage: actualPage,
    } = req.query;
    const itemsPerPage = items > count ? PER_PAGE : items;
    const query = req.query;
    const currentPage = Math.max(Number(actualPage || 1), 1);

    /** @type { import('@prisma/client').Prisma.ProductFindManyArgs} */
    const options = {
      take: itemsPerPage ? Number(itemsPerPage) : PER_PAGE,
      skip: (currentPage - 1) * PER_PAGE,
      orderBy: {
        name: "asc",
      },
      include: {
        categories: { select: { name: true } },
      },
    };

    if (search) {
      options.where = {
        description: {
          contains: search,
        },
      };
    }
    if (orderby) {
      options.orderBy = {
        [orderby]: orderdir || "asc",
      };
    }
    if (category) {
      options.where = {
        categories: {
          some: {
            name: category,
          },
        },
      };
    }

    const products = await fetchProductsWithPagination(options);

    const prodFrase = products.length < 2 ? "product" : "products";
    const finalPage = Math.ceil(count / PER_PAGE);
    const nextPage = Math.min(currentPage + 1, finalPage);
    const prevPage = Math.max(currentPage - 1, 0);

    res.status(200).json({
      message: `${products.length} ${prodFrase} fetched succesfully!`,
      data: products,
      count,
      finalPage,
      nextPage,
      prevPage,
      items,
      currentPage: currentPage,
    });
  } catch (error) {
    next(error);
  }
}

async function createNewProduct(req, res, next) {
  try {
    const newProduct = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created succesfully",
      createdProduct: newProduct,
    });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const singleProduct = await fetchProduct(productId);

    if (!singleProduct) throw new NotFound("Product not found");

    if (productId === "special") {
      res.status(200).json({
        message: "You discovered the special ID",
        id: productId,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Single product fetched succesfully!",
        fetchedProduct: singleProduct,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const data = req.body;

    const updatedProduct = await productUpdate(productId, data);

    res.status(200).json({
      message: `Product with id: ${productId} was updated.`,
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    if (error.code === "P2025") {
      next(new NotFound("Product not found"));
    } else {
      next(error);
    }
  }
}
const updateProductStock = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { stock } = req.body;
    const updatedProduct = await productStockUpdate(productId, stock);

    res.status(200).json({
      success: true,
      message: `Products stock was updated.`,
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    if (error.code === "P2025") {
      next(new NotFound("Product not found"));
    } else {
      next(error);
    }
  }
};

async function deleteProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const deletedProduct = await removeProduct(productId);
    res.status(200).json({
      message: `Product with id: ${productId} was deleted.`,
      deletedProduct: deletedProduct,
    });
  } catch (error) {
    if (error.code === "P2025") {
      next(new NotFound("Product not found"));
    } else {
      next(error);
    }
  }
}

module.exports = {
  createNewProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  updateProductStock,
};
