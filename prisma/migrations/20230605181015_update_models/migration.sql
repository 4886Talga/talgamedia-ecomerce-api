/*
  Warnings:

  - Added the required column `resetPasswordExpire` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `resetPasswordExpire` DATETIME(3) NOT NULL,
    ADD COLUMN `resetPasswordToken` VARCHAR(191) NOT NULL;
