import NextAuth from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
