"use client";

import { FC, useTransition } from "react";
import { useCardContext } from "@/context/card-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { labelSchema } from "@/lib/schemas/label";
import { generateRandomHex } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
import { Separator } from "@/components/ui/separator";
import {
  createLabel,
  removeLabel,
  updateLabel,
} from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/actions";

interface LabelFormProps {
  label?: Label;
  onBack: () => void;
}

const LabelForm: FC<LabelFormProps> = ({ onBack, label }) => {
  const { board, revalidateBoard, revalidateCard } = useCardContext();
  const [isRemoving, startTransition] = useTransition();

  const form = useForm<z.infer<typeof labelSchema>>({
    resolver: zodResolver(labelSchema),
    defaultValues: {
      title: label?.title ?? "",
      color: label?.color ?? generateRandomHex(),
    },
  });

  const title = form.watch("title");
  const color = form.watch("color");

  const onSubmit = async (values: z.infer<typeof labelSchema>) => {
    await (label
      ? updateLabel(label.id, values)
      : createLabel(board.id, values));

    await Promise.all([revalidateBoard(), revalidateCard()]);
    onBack();
  };

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel className="flex items-center gap-2 text-base">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>

        {label ? "Edit label" : "Create label"}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <div className="w-full px-8 py-3">
        <div
          className="h-[40px] flex-1 cursor-pointer rounded-md px-4 py-2 font-semibold text-background"
          style={{ backgroundColor: color }}
        >
          {title}
        </div>
      </div>
      <DropdownMenuSeparator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-72 flex-col gap-2 p-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <div className="flex items-center justify-between gap-2">
            <LoadingButton
              type="submit"
              variant="default"
              loading={form.formState.isSubmitting}
            >
              {label ? "Save" : "Create"}
            </LoadingButton>

            {label && (
              <LoadingButton
                loading={isRemoving}
                type="button"
                variant="destructive"
                onClick={() => {
                  startTransition(async () => {
                    await removeLabel(label.id);
                    await Promise.all([revalidateBoard(), revalidateCard()]);
                    onBack();
                  });
                }}
              >
                Delete
              </LoadingButton>
            )}
          </div>
        </form>
      </Form>
    </DropdownMenuContent>
  );
};

export default LabelForm;
