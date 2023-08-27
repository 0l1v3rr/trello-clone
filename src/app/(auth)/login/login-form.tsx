"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const params = useSearchParams();
  const router = useRouter();

  const [error, setError] = useState<string>();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
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
        className="space-y-6 items-stretch flex flex-col"
      >
        {error && <Alert variant="destructive">{error}</Alert>}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail or username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
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
                <Input placeholder="*************" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="link" className="w-fit mx-auto" asChild>
          <Link href="/register">Don&apos;t have an account?</Link>
        </Button>

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
