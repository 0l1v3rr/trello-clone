/*
  Warnings:

  - A unique constraint covering the columns `[slug,ownerId]` on the table `boards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `boards_slug_ownerId_key` ON `boards`(`slug`, `ownerId`);
