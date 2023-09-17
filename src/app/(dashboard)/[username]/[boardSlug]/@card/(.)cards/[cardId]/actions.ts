"use server";

import { CardDetail } from "@/types/board";
import { prisma } from "@/lib/prisma";

export async function getCardDetails(cardId: string): Promise<CardDetail> {
  return await prisma.card.findUniqueOrThrow({
    where: { id: cardId },
    include: { list: true, labels: true },
  });
}

export async function removeCardLabel(cardId: string, labelId: string) {
  await prisma.card.update({
    where: { id: cardId },
    data: { labels: { disconnect: { id: labelId } } },
  });
}

export async function addCardLabel(cardId: string, labelId: string) {
  await prisma.card.update({
    where: { id: cardId },
    data: { labels: { connect: { id: labelId } } },
  });
}
