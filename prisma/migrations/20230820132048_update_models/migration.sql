/*
  Warnings:

  - You are about to drop the column `sessionId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `totalAfterDiscount` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `promo` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `mode` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Made the column `cartTotalt` on table `cart` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `amount` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_orderId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `sessionId`,
    DROP COLUMN `status`,
    DROP COLUMN `token`,
    DROP COLUMN `totalAfterDiscount`,
    DROP COLUMN `userId`,
    ADD COLUMN `orderId` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    MODIFY `cartTotalt` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `productId`,
    DROP COLUMN `promo`,
    DROP COLUMN `sessionId`,
    DROP COLUMN `status`,
    DROP COLUMN `token`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `cartId`,
    MODIFY `averageRating` DECIMAL(65, 30) NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `code`,
    DROP COLUMN `content`,
    DROP COLUMN `mode`,
    DROP COLUMN `type`,
    ADD COLUMN `amount` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Cart_productId_key` ON `Cart`(`productId`);

-- CreateIndex
CREATE UNIQUE INDEX `Transactions_orderId_key` ON `Transactions`(`orderId`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
