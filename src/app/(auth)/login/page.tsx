import React from "react";
import { getProviders } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DiscordAuth from "@/app/(auth)/login/discord-auth";
import GithubAuth from "@/app/(auth)/login/github-auth";
import LoginForm from "@/app/(auth)/login/login-form";

const LoginPage = async () => {
  const providers = await getProviders();

  return (
    <main className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <Card className="w-96">
        <CardHeader className="items-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Trello Clone</CardDescription>
        </CardHeader>

        <CardContent className="flex gap-4">
          <GithubAuth github={providers?.github} />
          <DiscordAuth discord={providers?.discord} />
        </CardContent>

        <CardContent>
          <hr className="bg-border w-[calc(21rem)] h-[1px] mx-auto mb-4" />
        </CardContent>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
