"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { BoardDetail } from "@/app/(dashboard)/[username]/[boardSlug]/page";

export async function findBoardByUsernameAndSlug(
  username: string,
  boardSlug: string
): Promise<BoardDetail> {
  const owner = await prisma.user.findUniqueOrThrow({ where: { username } });

  return await prisma.board.findUniqueOrThrow({
    where: { slug_ownerId: { slug: boardSlug, ownerId: owner.id } },
    include: {
      members: true,
      owner: true,
      labels: true,
      lists: {
        orderBy: { position: "asc" },
      },
    },
  });
}

export async function createList(
  boardId: string,
  title: string,
  position: number,
  path: string
) {
  const list = await prisma.list.create({
    data: {
      position,
      title,
      boardId,
    },
  });

  revalidatePath(path);
  return list;
}

export async function getCardsByList(listId: string) {
  return await prisma.card.findMany({
    where: { listId: listId },
    orderBy: { position: "asc" },
    include: { labels: true },
  });
}
