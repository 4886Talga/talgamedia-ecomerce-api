const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const categories = require("../data/categories.js");
const products = require("../data/products.js");

/* async function main() {
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); */

  async function seedProducts() {
    try {
      // Create products with associated categories
      const products = await Promise.all(
        products.map(async productData => {
          const product = await prisma.product.create({
            data: {
              name: productData.name,
              price: productData.price,
              discount: productData.discount,
              image: productData.image,
              brand: productData.brand,
              countInStock: productData.countInStock,
              slug: productData.slug,
              sku:productData.sku,
              description: productData.description
              categories: {
                connectOrCreate: productData.categories.map(categoryName => ({
                  where: { name: categoryName },
                  create: { name: categoryName },
                })),
              },
            },
            include: { categories: true } // Include associated categories in the response
          });
          return product;
        })
      );
  
      return products;
    } catch (error) {
      console.error("Error seeding products:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  seedProducts()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
  
