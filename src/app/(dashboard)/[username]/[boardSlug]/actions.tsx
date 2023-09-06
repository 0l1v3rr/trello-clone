"use server";

import { prisma } from "@/lib/prisma";

export async function findBoardByUsernameAndSlug(
  username: string,
  boardSlug: string
) {
  const owner = await prisma.user.findUniqueOrThrow({ where: { username } });

  return await prisma.board.findUniqueOrThrow({
    where: { slug_ownerId: { slug: boardSlug, ownerId: owner.id } },
  });
}
