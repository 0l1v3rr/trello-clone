import { env } from "@/env.mjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials Provider",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials.username },
              { email: credentials.username },
            ],
          },
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        return isPasswordValid ? user : null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
