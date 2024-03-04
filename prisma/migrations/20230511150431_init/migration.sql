/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `House` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `builtById` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `house` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `builtById` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD COLUMN `wifiPassword` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `House_address_key` ON `House`(`address`);

-- AddForeignKey
ALTER TABLE `House` ADD CONSTRAINT `House_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `House` ADD CONSTRAINT `House_builtById_fkey` FOREIGN KEY (`builtById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `House` ADD CONSTRAINT `House_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
