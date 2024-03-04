/*
  Warnings:

  - You are about to drop the column `admin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `admin`,
    DROP COLUMN `profile`,
    MODIFY `role` VARCHAR(191) NULL;
