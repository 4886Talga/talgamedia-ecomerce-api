const { Category } = require("../prisma/initDB");

module.exports.createCategory = async (categoryName) => {
  return await Category.create({
    data: {
      name: categoryName,
    },
  });
};

module.exports.fetchCategories = async () => {
  return await Category.findMany({
    select: {
      name: true,
    },
  });
};

module.exports.fetchCategory = async (categoryName) => {
  return await Category.findUnique({
    where: {
      name: categoryName,
    },
  });
};

module.exports.fetchCategoryById = async (id) => {
  return await Category.findUnique({
    where: {
      id: id,
    },
  });
};

module.exports.deleteCategory = async (id) => {
  return await Category.delete({
    where: {
      id: id,
    },
  });
};

module.exports.updateCategoryName = async (categoryId, categoryName) => {
  return await Category.update({
    where: {
      id: categoryId,
    },
    data: categoryName,
  });
};
