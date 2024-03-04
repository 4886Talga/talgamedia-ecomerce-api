const express = require("express");
const productsController = require("../../controllers/product.controller");
const {
  authorizeAccess,
  authorizeAdmin,
} = require("../../middleware/handleCurrentUser");

// Include other resource routers
const reviewRouter = require("./reviews");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router.get("/", productsController.getAllProducts);
router.get("/:productId", authorizeAccess, productsController.getProduct);
router.post(
  "/",
  authorizeAccess,
  authorizeAdmin,
  productsController.createNewProduct
);
router.patch(
  "/:productId",
  authorizeAccess,
  authorizeAdmin,
  productsController.updateProduct
);
router.delete(
  "/:productId",
  authorizeAccess,
  authorizeAdmin,
  productsController.deleteProduct
);
router.patch(
  "/addStock/:productId",
  authorizeAccess,
  authorizeAdmin,
  productsController.updateProductStock
);

module.exports = router;
