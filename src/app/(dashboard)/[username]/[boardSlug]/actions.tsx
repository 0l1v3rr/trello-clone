"use server";

import { revalidatePath } from "next/cache";
import { BoardDetail, ListDetail } from "@/types/board";
import { prisma } from "@/lib/prisma";

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

export async function getListsByBoardId(
  boardId: string
): Promise<ListDetail[]> {
  return await prisma.list.findMany({
    where: { boardId: boardId },
    orderBy: { position: "asc" },
    include: {
      cards: { include: { labels: true }, orderBy: { position: "asc" } },
    },
  });
}

export async function createList(
  {
    boardId,
    title,
    position,
  }: { boardId: string; title: string; position: number },
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

export async function createCard(
  {
    listId,
    title,
  }: {
    listId: string;
    title: string;
  },
  path: string
) {
  const cards = await getCardsByList(listId);
  const card = await prisma.card.create({
    data: { title, position: (cards.at(-1)?.position ?? 0) + 1, listId },
  });

  revalidatePath(path);
  return card;
}

export async function getCardsByList(listId: string) {
  return await prisma.card.findMany({
    where: { listId: listId },
    orderBy: { position: "asc" },
    include: { labels: true },
  });
}
