"use server";

import * as z from "zod";
import { CardDetail } from "@/types/board";
import { prisma } from "@/lib/prisma";
import { labelSchema } from "@/lib/schemas/label";

export async function getCardDetails(cardId: string): Promise<CardDetail> {
  return await prisma.card.findUniqueOrThrow({
    where: { id: cardId },
    include: { list: true, labels: { orderBy: { color: "asc" } } },
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

export async function createLabel(
  boardId: string,
  label: z.infer<typeof labelSchema>
) {
  return await prisma.label.create({ data: { boardId, ...label } });
}

export async function updateLabel(
  labelId: string,
  label: z.infer<typeof labelSchema>
) {
  return await prisma.label.update({
    where: { id: labelId },
    data: { ...label },
  });
}

export async function removeLabel(id: string) {
  await prisma.label.delete({ where: { id } });
}
