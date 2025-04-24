/*
  Warnings:

  - You are about to alter the column `createdAt` on the `recordgroup` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `createdAt` on the `recordinvididual` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `recordgroup` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `recordinvididual` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
