"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { changePasswordSchema } from "@/lib/schemas/password";
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
import { changePassword } from "@/app/(dashboard)/settings/actions";

const PasswordPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [error, setError] = useState<string>();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    try {
      await changePassword(user.id, values);
      router.push("/");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">
        {user.password === null ? "Create" : "Change"} password
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-w-[400px] flex-col items-start space-y-6"
        >
          {error && <Alert variant="destructive">{error}</Alert>}

          {user.password !== null && (
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Old password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>New password confirmation</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default PasswordPage;
