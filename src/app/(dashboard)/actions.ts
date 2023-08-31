"use server";

import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

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
