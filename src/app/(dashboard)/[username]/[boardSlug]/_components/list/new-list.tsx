"use client";

import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { listSchema } from "@/lib/schemas/list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { createList } from "@/app/(dashboard)/[username]/[boardSlug]/actions";
import { BoardDetail } from "@/app/(dashboard)/[username]/[boardSlug]/page";

interface NewListProps {
  board: BoardDetail;
}

const NewList: FC<NewListProps> = ({ board }) => {
  const [mode, setMode] = useState<"form" | "button">("button");

  const form = useForm<z.infer<typeof listSchema>>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof listSchema>) => {
    await createList(
      board.id,
      values.name,
      (board.lists.at(-1)?.position ?? 0) + 1,
      `/${board.owner.username}/${board.slug}`
    );
    setMode("button");
    form.reset();
  };

  if (mode === "button") {
    return (
      <Button
        className="w-[300px]"
        size="lg"
        variant="secondary"
        onClick={() => setMode("form")}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add {board.lists.length === 0 ? "a" : "another"} list
      </Button>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[300px]">
          <CardContent className="px-4 pb-2 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="Enter list title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center gap-2 px-4 py-2">
            <LoadingButton size="sm" loading={form.formState.isSubmitting}>
              Add list
            </LoadingButton>
            <Button
              size="icon"
              onClick={() => setMode("button")}
              variant="ghost"
              type="button"
            >
              <X />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default NewList;
