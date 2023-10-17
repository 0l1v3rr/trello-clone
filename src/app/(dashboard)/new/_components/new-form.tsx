"use client";

import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context";
import { useBoardListContext } from "@/context/board-list-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Board } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { boardSchema } from "@/lib/schemas/board";
import { generateRandomHex, slugify } from "@/lib/utils";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { Switch } from "@/components/ui/switch";
import { BoardWithOwner } from "@/components/navbar/dropdowns/boards-dropdown";
import BackgroundSelect from "@/app/(dashboard)/new/_components/background/background-select";
import { createBoard } from "@/app/(dashboard)/new/actions";

const NewForm = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { setBoardList, boardList } = useBoardListContext();
  const [error, setError] = useState<string>();

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
      slug: "",
      public: true,
      background: { type: "color", value: generateRandomHex() },
    },
  });

  const watchedName = form.watch("name");

  const updateSlug = useEffectEvent((name: string) => {
    form.setValue("slug", slugify(name));
  });

  useEffect(() => updateSlug(watchedName), [watchedName, updateSlug]);

  const onSubmit = async (values: z.infer<typeof boardSchema>) => {
    try {
      const createdBoard: Board = await createBoard(user.id, values);
      const createdBoardWithOwner: BoardWithOwner = {
        ...createdBoard,
        owner: user,
      };
      setBoardList([createdBoardWithOwner, ...boardList]);
      router.push(`/${user.username}/${createdBoard.slug}`);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start space-y-6"
      >
        {error && <Alert variant="destructive">{error}</Alert>}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Board name</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Test Board" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="public"
          render={({ field }) => (
            <FormItem className="flex w-full flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Public</FormLabel>
                <FormDescription>
                  Only board members have access to the private boards. A public
                  board is visible to anyone.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="background"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Background</FormLabel>
              <FormControl>
                <BackgroundSelect
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <LoadingButton type="submit" loading={form.formState.isSubmitting}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
};

export default NewForm;
