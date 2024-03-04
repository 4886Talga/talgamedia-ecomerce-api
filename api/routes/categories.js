const express = require("express");
const categoriesController = require("../../controllers/category.controller");
const {
  authorizeAccess,
  authorizeAdmin,
} = require("../../middleware/handleCurrentUser");
const { validateCategory } = require("../../middleware/validate");

const router = express.Router();

router.get("/", categoriesController.getAllCategories);
router.get("/:categoryId", categoriesController.getCategory);
router.post(
  "/",
  authorizeAccess,
  authorizeAdmin,
  validateCategory,
  categoriesController.createNewCategory
);
router.put(
  "/:categoryId",
  authorizeAccess,
  authorizeAdmin,
  validateCategory,
  categoriesController.updateCategory
);
router.delete(
  "/:categoryId",
  authorizeAccess,
  authorizeAdmin,
  categoriesController.deleteCategory
);

module.exports = router;
