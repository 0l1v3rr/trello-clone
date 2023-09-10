import { FC } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CardModalProps {
  params: {
    cardId: string;
  };
}

const CardModal: FC<CardModalProps> = ({ params }) => {
  return (
    <Dialog open>
      <DialogContent showCloseBtn={false}>
        <Button
          className="absolute right-4 top-4 rounded-sm"
          size="icon"
          variant="ghost"
          asChild
        >
          <Link href="/">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Link>
        </Button>

        <DialogHeader>
          <DialogTitle>{params.cardId}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
