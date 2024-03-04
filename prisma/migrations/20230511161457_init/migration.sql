/*
  Warnings:

  - You are about to drop the column `userId` on the `house` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `house` DROP FOREIGN KEY `House_userId_fkey`;

-- AlterTable
ALTER TABLE `house` DROP COLUMN `userId`;
