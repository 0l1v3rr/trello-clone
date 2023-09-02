/*
  Warnings:

  - You are about to drop the column `image` on the `boards` table. All the data in the column will be lost.
  - Added the required column `background` to the `boards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `boards` DROP COLUMN `image`,
    ADD COLUMN `background` JSON NOT NULL;
