/*
  Warnings:

  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reviews` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`;
