/*
  Warnings:

  - You are about to drop the column `A` on the `_categorytoproduct` table. All the data in the column will be lost.
  - You are about to drop the column `B` on the `_categorytoproduct` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `_categorytoproduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `_categorytoproduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_CategoryToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_CategoryToProduct_B_fkey`;

-- DropIndex
DROP INDEX `_CategoryToProduct_AB_unique` ON `_categorytoproduct`;

-- AlterTable
ALTER TABLE `_categorytoproduct` DROP COLUMN `A`,
    DROP COLUMN `B`,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`productId`, `categoryId`);

-- AddForeignKey
ALTER TABLE `_categorytoproduct` ADD CONSTRAINT `_categorytoproduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_categorytoproduct` ADD CONSTRAINT `_categorytoproduct_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
