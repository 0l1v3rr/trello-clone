"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useCardContext } from "@/context/card-context";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditableTitle from "@/components/editable-title";
import { updateCard } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

const CardHeader = () => {
  const router = useRouter();
  const { card, board } = useCardContext();

  return (
    <DialogHeader className="flex w-full flex-col justify-between">
      <div className="flex w-full items-center justify-center gap-4">
        <DialogTitle className="w-full">
          <EditableTitle
            title={card.title}
            onSave={(title) => updateCard(card.id, { title })}
            className="w-ful text-3xl font-semibold hover:bg-transparent"
          />
        </DialogTitle>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            router.push(`/${board.owner.username}/${board.slug}`);
            router.refresh();
          }}
        >
          <X />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <DialogDescription>
        in list <span className="underline">{card.list.title}</span>
      </DialogDescription>
    </DialogHeader>
  );
};

export default CardHeader;
