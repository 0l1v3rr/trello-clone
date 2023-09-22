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

const CardHeader = () => {
  const router = useRouter();
  const { card } = useCardContext();

  return (
    <DialogHeader className="flex flex-row items-start justify-between">
      <div className="flex flex-col gap-1">
        <DialogTitle className="text-3xl">{card.title}</DialogTitle>
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
