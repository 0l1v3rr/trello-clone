"use client";

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
  const { card } = useCardContext();

  return (
    <DialogHeader className="flex w-full flex-row items-start justify-between">
      <div className="flex w-full flex-col gap-1">
        <DialogTitle>
          <EditableTitle
            title={card.title}
            onSave={(title) => updateCard(card.id, { title })}
            className="text-3xl font-semibold hover:bg-transparent"
          />
        </DialogTitle>
        <DialogDescription>
          in list <span className="underline">{card.list.title}</span>
        </DialogDescription>
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => {
          router.back();
          router.refresh();
        }}
      >
        <X />
        <span className="sr-only">Close</span>
      </Button>
    </DialogHeader>
  );
};

export default CardHeader;
