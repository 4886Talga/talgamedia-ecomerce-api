/*
  Warnings:

  - The primary key for the `_categorytoproduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `_categorytoproduct` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `_categorytoproduct` table. All the data in the column will be lost.
  - Added the required column `A` to the `_categorytoproduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `B` to the `_categorytoproduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_categorytoproduct_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_categorytoproduct_productId_fkey`;

-- AlterTable
ALTER TABLE `_categorytoproduct` DROP PRIMARY KEY,
    DROP COLUMN `categoryId`,
    DROP COLUMN `productId`,
    ADD COLUMN `A` VARCHAR(191) NOT NULL,
    ADD COLUMN `B` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`A`, `B`);

-- AddForeignKey
ALTER TABLE `_categorytoproduct` ADD CONSTRAINT `_categorytoproduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_categorytoproduct` ADD CONSTRAINT `_categorytoproduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
