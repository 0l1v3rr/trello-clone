"use server";

import { CardDetail } from "@/types/board";
import { prisma } from "@/lib/prisma";

export async function getCardDetails(cardId: string): Promise<CardDetail> {
  return await prisma.card.findUniqueOrThrow({
    where: { id: cardId },
    include: { list: true, labels: true },
  });
}
