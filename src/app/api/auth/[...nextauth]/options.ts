import { env } from "@/env.mjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import { createSsoUser, login } from "@/app/api/auth/[...nextauth]/actions";

export const options: AuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      async profile(profile: GithubProfile) {
        if (!profile.email) {
          throw new Error("Your provider must provide an email!");
        }

        return createSsoUser({
          email: profile.email,
          name: profile.name ?? profile.login,
          avatar: profile.avatar_url,
        });
      },
    }),
    DiscordProvider({
      clientId: env.DISCORD_ID,
      clientSecret: env.DISCORD_SECRET,
      async profile(profile: DiscordProfile) {
        return createSsoUser({
          email: profile.email,
          name: profile.global_name,
          avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`,
        });
      },
    }),
    CredentialsProvider({
      name: "Credentials Provider",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        return !credentials?.username || !credentials.password
          ? null
          : login(credentials);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.status = user.status;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.status = token.status;
      }
      return session;
    },
  },
};
