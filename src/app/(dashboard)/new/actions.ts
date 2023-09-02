"use server";

import { Prisma } from "@prisma/client";
import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { boardSchema } from "@/lib/schemas/board";

export async function createBoard(
  userId: string,
  board: z.infer<typeof boardSchema>
) {
  const res = boardSchema.safeParse(board);
  if (!res.success) {
    throw new Error(res.error.errors.at(0)?.message);
  }

  const foundBoard = await prisma.board.findUnique({
    where: { slug_ownerId: { slug: board.slug, ownerId: userId } },
  });
  if (foundBoard) {
    throw new Error("Board with this slug already exist");
  }

  const background = board.image as unknown as Prisma.JsonArray;
  return await prisma.board.create({
    data: { ...board, image: background, ownerId: userId },
  });
}
