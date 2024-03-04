const {
  createCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategoryName,
  deleteCategory,
} = require("../services/categoryService");
const { Conflict, NotFound } = require("../utils/errorResponse");

module.exports.createNewCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategory(name);

    res.status(201).json({
      success: true,
      message: `Category created by name '${newCategory.name}'`,
    });
  } catch (error) {
    if (error.code === "P2002") {
      next(new Conflict(`A category already exists by this name`));
    } else {
      next(error);
    }
  }
};

module.exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await fetchCategories();
    const prodFrase = categories.length < 2 ? "category" : "categories";

    res.status(200).json({
      success: true,
      message: `${categories.length} ${prodFrase} fetched succesfully!`,
      data: categories,
    });
  } catch (error) {
    next();
  }
};

module.exports.updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const name = req.body;
    await updateCategoryName(categoryId, name);

    res.status(200).json({
      success: "true",
      message: `Category updated for id ${categoryId}`,
    });
  } catch (error) {
    if (error.code === "P2025") {
      next(new NotFound("Category not found"));
    } else if (error.code === "P2002") {
      next(new Conflict("Category already exists with this name"));
    } else {
      next(error);
    }
  }
};

module.exports.getCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const singleCategory = await fetchCategoryById(categoryId);

    res.status(200).json({
      success: true,
      message: `Single ${singleCategory.name} category fetched succesfully!"`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCategory = async (req, res, next) => {
  const id = req.params.categoryId;
  try {
    const deletedCategory = await deleteCategory(id);

    res.status(200).json({
      success: true,
      message: `Single ${deletedCategory.name} was deleted succesfully!"`,
    });
  } catch (error) {
    next(error);
  }
};
