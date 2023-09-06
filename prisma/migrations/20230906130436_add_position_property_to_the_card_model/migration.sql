/*
  Warnings:

  - Added the required column `position` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `card` ADD COLUMN `position` INTEGER NOT NULL;
