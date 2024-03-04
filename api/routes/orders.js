const express = require("express");
const orderController = require("../../controllers/order.controller");
const checkAuthMiddleware = require("../../middleware/check-auth");

const router = express.Router();

//router.get("/", orderController.getAllOrder);
//router.get("/orderId", orderController.getOrder);
//router.post("/", checkAuthMiddleware.checkAuth, orderController.createNewOrder);
/* router.put(
  "/:orderId",
  checkAuthMiddleware.checkAuth,
  productsController.updateOrder
);
router.delete(
  "/:orderId",
  checkAuthMiddleware.checkAuth,
  productsController.deleteOrder
); */

module.exports = router;
