import type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: Session["user"] & {
      id: string;
    };
  }
}
