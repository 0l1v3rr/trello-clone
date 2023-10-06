"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useOuterClick } from "@/hooks/use-outer-click";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateList } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

interface ListTitleProps {
  listId: string;
  title: string;
}

const ListTitle: FC<ListTitleProps> = ({ title: initialTitle, listId }) => {
  const router = useRouter();
  const [mode, setMode] = useState<"EDIT" | "DISPLAY">("DISPLAY");
  const [title, setTitle] = useState(initialTitle);

  const inputRef = useOuterClick<HTMLInputElement>(async () => {
    if (mode === "EDIT") {
      setMode("DISPLAY");
      await updateList(listId, { title });
      router.refresh();
    }
  });

  return (
    <CardTitle>
      {mode === "DISPLAY" && (
        <Button
          variant="ghost"
          className="w-full justify-start px-2 text-lg"
          onClick={() => {
            setMode("EDIT");
            inputRef.current?.focus(); // TODO focus the actual input. Maybe, select the title
          }}
        >
          {title}
        </Button>
      )}

      {mode === "EDIT" && (
        <Input
          ref={inputRef}
          placeholder="Enter list title"
          className="w-full text-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
    </CardTitle>
  );
};

export default ListTitle;
