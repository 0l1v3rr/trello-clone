"use server";

import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BoardWithOwner } from "@/components/navbar/dropdowns/boards-dropdown";

export async function updateUser(id: string, user: Omit<Partial<User>, "id">) {
  await prisma.user.update({
    where: { id: id },
    data: { ...user },
  });
  revalidatePath("/");
}

export async function getUserById(id: string) {
  return await prisma.user.findUniqueOrThrow({ where: { id } });
}

export async function getUserBoards(id: string): Promise<BoardWithOwner[]> {
  return await prisma.board.findMany({
    where: { ownerId: id },
    include: { owner: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getUserGuestBoards(
  id: string
): Promise<BoardWithOwner[]> {
  return await prisma.board.findMany({
    where: { members: { some: { id: id } } },
    include: { owner: true },
    orderBy: { updatedAt: "desc" },
  });
}
