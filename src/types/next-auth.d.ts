import { User as PrismaUser } from "@prisma/client";
import type { DefaultJWT, DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: PrismaUser;
  }

  interface User extends PrismaUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, PrismaUser {}
}
