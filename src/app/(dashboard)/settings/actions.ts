"use server";

import * as bcrypt from "bcrypt";
import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { changePasswordSchema } from "@/lib/schemas/password";

export async function changePassword(
  userId: string,
  values: z.infer<typeof changePasswordSchema>
) {
  const res = changePasswordSchema.safeParse(values);
  if (!res.success) {
    throw new Error(res.error.errors.at(0)?.message);
  }

  const oldPassword = (
    await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { password: true },
    })
  ).password;

  if (oldPassword) {
    const isPasswordValid = await bcrypt.compare(
      values.oldPassword,
      oldPassword
    );

    if (!isPasswordValid) {
      throw new Error("The old password is incorrect");
    }
  }

  const newPassword = await bcrypt.hash(values.password, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: newPassword },
  });
}
