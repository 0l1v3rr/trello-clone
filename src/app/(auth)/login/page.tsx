import React from "react";
import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = async () => {
  const providers = await getProviders();

  return (
    <main className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <Card className="m-4 w-full md:w-96">
        <CardHeader className="items-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Trello Clone</CardDescription>
        </CardHeader>

        <CardContent className="flex gap-4">
          <GithubAuth github={providers?.github} />
          <DiscordAuth discord={providers?.discord} />
        </CardContent>

        <CardContent>
          <hr className="mx-auto mb-4 h-[1px] w-[calc(21rem)] bg-border" />
        </CardContent>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
