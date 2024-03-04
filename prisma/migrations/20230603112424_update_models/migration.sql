/*
  Warnings:

  - You are about to drop the column `productId` on the `cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_productId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `cartId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
