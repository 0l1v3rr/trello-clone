"use server";

import { prisma } from "@/lib/prisma";
import { BoardDetail } from "./page";

export async function findBoardByUsernameAndSlug(
  username: string,
  boardSlug: string
): Promise<BoardDetail> {
  const owner = await prisma.user.findUniqueOrThrow({ where: { username } });

  return await prisma.board.findUniqueOrThrow({
    where: { slug_ownerId: { slug: boardSlug, ownerId: owner.id } },
    include: { members: true, owner: true, labels: true, lists: true },
  });
}
