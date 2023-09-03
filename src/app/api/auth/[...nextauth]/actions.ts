import * as bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import {
  generateRandomHex,
  generateUsernameFromEmail,
  slugify,
} from "@/lib/utils";
import { createBoard } from "@/app/(dashboard)/new/actions";

interface SsoCredentials {
  name: string;
  email: string;
  avatar?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export async function createSsoUser(credentials: SsoCredentials) {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (user) return user;

  const newUser = await prisma.user.create({
    data: {
      email: credentials.email,
      name: credentials.name,
      username: generateUsernameFromEmail(credentials.email),
      image: credentials.avatar,
    },
  });

  await createBoard(newUser.id, {
    name: `${newUser.name}'s Board`,
    slug: `${slugify(newUser.name)}s-board`,
    public: false,
    background: { type: "color", value: generateRandomHex() },
  });

  return newUser;
}

export async function login(credentials: LoginCredentials) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: credentials.username }, { email: credentials.username }],
    },
  });

  if (!user || !user.password) return null;

  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    user.password
  );

  return isPasswordValid ? user : null;
}
