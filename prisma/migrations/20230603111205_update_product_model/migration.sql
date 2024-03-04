/*
  Warnings:

  - You are about to drop the column `cartId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_cartId_fkey`;

-- AlterTable
ALTER TABLE `cart` ADD COLUMN `productId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `cartId`;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
