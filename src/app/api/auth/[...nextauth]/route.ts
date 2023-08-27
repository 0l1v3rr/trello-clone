import { env } from "@/env.mjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import { createSsoUser, login } from "@/app/api/auth/[...nextauth]/actions";

const handler = NextAuth({
  pages: {
    signIn: "/login",
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
});

export { handler as GET, handler as POST };
