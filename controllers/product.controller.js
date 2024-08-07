const { PrismaClient } = require("@prisma/client");
var url = require("url");
const {
  createProduct,
  fetchProduct,
  fetchProductsWithPagination,
  productStockUpdate,
  productUpdate,
  removeProduct,
  fetchProductsByIds,
  fetchProductBySlug,
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
    const itemsPerPage = items ? items : PER_PAGE;
    const currentPage = Math.max(Number(actualPage || 1), 1);

    /** @type { import('@prisma/client').Prisma.ProductFindManyArgs} */
    const options = {
      take: Number(itemsPerPage),
      skip: (currentPage - 1) * itemsPerPage,
      orderBy: {
        name: "asc",
      },
      include: {
        categories: {
          include: {
            category: {
              select: { name: true },
            },
          },
        },
      },
    };

    if (search && search !== "") {
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
            category: {
              name: category,
            },
          },
        },
      };
    }

    const products = await fetchProductsWithPagination(options);

    const amountFetchedProducts = products.length;
    const prodFrase = products.length < 2 ? "product" : "products";
    const finalPage = Math.ceil(amountFetchedProducts / items);
    const nextPage = Math.min(currentPage + 1, finalPage);
    const prevPage = Math.max(currentPage - 1, 0);

    res.status(200).json({
      message: `${products.length} ${prodFrase} fetched succesfully!`,
      filteredProducts: products,
      count,
      finalPage,
      nextPage,
      prevPage,
      currentPage,
    });
  } catch (error) {
    next(error);
  }
}

async function getProductsByIds(req, res, next) {
  try {
    const { ids } = req.params;
    const productIds = ids.split(",");
    const products = await fetchProductsByIds(productIds);

    if (!products) throw new NotFound("Products not found");

    res.status(200).json({
      success: true,
      message: "Products fetched succesfully!",
      products: products,
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

async function getProductBySlug(req, res, next) {
  try {
    const { slug } = req.params;

    const singleProduct = await fetchProductBySlug(slug);

    if (!singleProduct) throw new NotFound("Product not found");

    res.status(200).json({
      success: true,
      message: "Single product fetched succesfully!",
      fetchedProduct: singleProduct,
    });
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
  getProductsByIds,
  deleteProduct,
  updateProduct,
  updateProductStock,
  getProductBySlug,
};
