"use server";

import { prisma } from "@/lib/prisma";

export async function getUserBoards(id: string) {
  return await prisma.board.findMany({
    include: { owner: true },
    orderBy: { updatedAt: "desc" },
    where: {
      OR: [{ ownerId: id }, { members: { some: { id: id } } }],
    },
  });
}
