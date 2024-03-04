/*
  Warnings:

  - You are about to drop the column `numReviews` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `thumbsDown` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `thumbsUp` on the `review` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `numReviews`,
    ADD COLUMN `averageRating` DECIMAL(65, 30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `thumbsDown`,
    DROP COLUMN `thumbsUp`,
    ADD COLUMN `rating` DECIMAL(65, 30) NOT NULL;
