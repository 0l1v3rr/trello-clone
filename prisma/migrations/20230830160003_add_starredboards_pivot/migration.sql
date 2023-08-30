-- CreateTable
CREATE TABLE `_StarredBoards` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_StarredBoards_AB_unique`(`A`, `B`),
    INDEX `_StarredBoards_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_StarredBoards` ADD CONSTRAINT `_StarredBoards_A_fkey` FOREIGN KEY (`A`) REFERENCES `boards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StarredBoards` ADD CONSTRAINT `_StarredBoards_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
