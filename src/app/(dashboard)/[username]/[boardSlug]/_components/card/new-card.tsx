"use client";

import { FC, useState } from "react";
import { useBoardContext } from "@/context/board-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { List } from "@prisma/client";
import { Plus, X } from "lucide-react";
import { resetServerContext } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cardSchema } from "@/lib/schemas/card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { createCard } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

interface NewCardProps {
  list: List;
}

const NewCard: FC<NewCardProps> = ({ list }) => {
  const { path } = useBoardContext();
  const [mode, setMode] = useState<"form" | "button">("button");

  const form = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof cardSchema>) => {
    resetServerContext();
    createCard({ listId: list.id, title: values.title }, path);
    setMode("button");
    form.reset();
  };

  if (mode === "button") {
    return (
      <Button
        className="w-full justify-start px-4"
        size="lg"
        variant="ghost"
        onClick={() => setMode("form")}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a card
      </Button>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card className="w-full border-none py-0">
          <CardContent className="p-0">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      autoFocus
                      autoComplete="off"
                      placeholder="Enter a title for this card"
                      className="bg-secondary [box-shadow:_none_!important]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="mt-2 flex items-center gap-2 p-0">
            <LoadingButton size="sm" loading={form.formState.isSubmitting}>
              Add card
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

export default NewCard;
