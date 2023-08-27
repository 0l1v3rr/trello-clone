import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/app/(auth)/login/login-form";
import GithubAuth from "./github-auth";
import GoogleAuth from "./google-auth";

const LoginPage = () => {
  return (
    <main className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <Card className="w-96">
        <CardHeader className="items-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Trello Clone</CardDescription>
        </CardHeader>

        <CardContent className="flex gap-4">
          <GithubAuth />
          <GoogleAuth />
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
