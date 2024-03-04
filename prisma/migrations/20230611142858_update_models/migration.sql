/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Review_productId_key` ON `Review`(`productId`);

-- CreateIndex
CREATE UNIQUE INDEX `Review_userId_key` ON `Review`(`userId`);
