/*
  Warnings:

  - You are about to drop the column `userId` on the `boards` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `boards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `boards` DROP FOREIGN KEY `boards_userId_fkey`;

-- AlterTable
ALTER TABLE `boards` DROP COLUMN `userId`,
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
