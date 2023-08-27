import { env } from "@/env.mjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
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
        const user = { id: "1", name: "oliver", password: "test" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
