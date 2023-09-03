"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "@/lib/schemas/login";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";

const LoginForm = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [error, setError] = useState<string>();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: params.get("email") ?? "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const res = await signIn("credentials", {
      ...values,
      callbackUrl: params.get("callbackUrl") ?? "/",
      redirect: false,
    });

    if (!res || res.error) {
      setError("Invalid login credentials");
    } else {
      router.push(params.get("callbackUrl") ?? "/");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch space-y-6"
      >
        {error && <Alert variant="destructive">{error}</Alert>}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail or username</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe"
                  data-test-id="login-email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="*************"
                  type="password"
                  data-test-id="login-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="link"
          className="mx-auto w-fit"
          asChild
          data-test-id="reg-btn"
        >
          <Link href="/register">Don&apos;t have an account?</Link>
        </Button>

        <LoadingButton
          data-test-id="login-submit-btn"
          type="submit"
          className="w-full"
          loading={form.formState.isSubmitting}
        >
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
