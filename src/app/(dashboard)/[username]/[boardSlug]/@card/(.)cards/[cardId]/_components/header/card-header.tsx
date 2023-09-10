"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { CardDetail } from "@/types/board";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CardHeaderProps {
  card: CardDetail;
}

const CardHeader: FC<CardHeaderProps> = ({ card }) => {
  const router = useRouter();

  return (
    <DialogHeader className="flex flex-row items-start justify-between">
      <div className="flex flex-col gap-1">
        <DialogTitle className="text-3xl">{card.title}</DialogTitle>
        <DialogDescription>
          in list <span className="underline">{card.list.title}</span>
        </DialogDescription>
      </div>

      <Button size="icon" variant="ghost" onClick={() => router.back()}>
        <X />
        <span className="sr-only">Close</span>
      </Button>
    </DialogHeader>
  );
};

export default CardHeader;
