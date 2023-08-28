import type { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      username: string;
      status?: string;
      image?: string;
      role: UserRole;
    };
  }
}
