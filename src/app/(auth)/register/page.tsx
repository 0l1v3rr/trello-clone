import React from "react";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/app/(auth)/register/registration-form";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = async () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <Card className="m-4 w-full md:w-96">
        <CardHeader className="items-center">
          <CardTitle>Register</CardTitle>
          <CardDescription>Trello Clone</CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
