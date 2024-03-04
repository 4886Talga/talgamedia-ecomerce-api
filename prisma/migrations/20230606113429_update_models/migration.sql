/*
  Warnings:

  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[emailToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `Token_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `emailToken` VARCHAR(191) NULL,
    ADD COLUMN `emailValid` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `validateEmailExpire` DATETIME(3) NULL;

-- DropTable
DROP TABLE `token`;

-- CreateIndex
CREATE UNIQUE INDEX `User_emailToken_key` ON `User`(`emailToken`);
