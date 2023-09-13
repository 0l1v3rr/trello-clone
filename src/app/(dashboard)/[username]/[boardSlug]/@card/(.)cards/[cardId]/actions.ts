"use server";

import { revalidatePath } from "next/cache";
import { CardDetail } from "@/types/board";
import { prisma } from "@/lib/prisma";

export async function getCardDetails(cardId: string): Promise<CardDetail> {
  return await prisma.card.findUniqueOrThrow({
    where: { id: cardId },
    include: { list: true, labels: true },
  });
}

export async function removeCardLabel(
  cardId: string,
  labelId: string,
  path: string
) {
  await prisma.card.update({
    where: { id: cardId },
    data: { labels: { disconnect: { id: labelId } } },
  });
  revalidatePath(path);
}

export async function addCardLabel(
  cardId: string,
  labelId: string,
  path: string
) {
  await prisma.card.update({
    where: { id: cardId },
    data: { labels: { connect: { id: labelId } } },
  });
  revalidatePath(path);
}
