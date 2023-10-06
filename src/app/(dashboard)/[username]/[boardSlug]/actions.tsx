"use server";

import { revalidatePath } from "next/cache";
import { Card, List } from "@prisma/client";
import { getServerSession } from "next-auth";
import { BoardDetail, BoardMemberType, ListDetail } from "@/types/board";
import { prisma } from "@/lib/prisma";
import { options } from "@/app/api/auth/[...nextauth]/options";

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

export async function findBoardById(id: string): Promise<BoardDetail> {
  return await prisma.board.findUniqueOrThrow({
    where: { id },
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

export async function updateCardPositions(
  cards: Pick<Card, "id" | "position">[]
) {
  await Promise.all(
    cards.map((card) => updateCard(card.id, { position: card.position }))
  );
}

export async function updateCard(
  cardId: string,
  card: Omit<Partial<Card>, "id">
) {
  return await prisma.card.update({ where: { id: cardId }, data: { ...card } });
}

export async function updateList(
  listId: string,
  list: Omit<Partial<List>, "id">
) {
  return await prisma.list.update({ where: { id: listId }, data: { ...list } });
}

export async function getBoardUserPermission(
  board: BoardDetail
): Promise<BoardMemberType> {
  const session = await getServerSession(options);

  if (board.ownerId === session?.user.id) {
    return "OWNER";
  }

  if (board.members.map((x) => x.id).includes(session?.user.id ?? "")) {
    return "MEMBER";
  }

  if (!board.public) {
    throw new Error("This board is private!");
  }

  return "VISITOR";
}
