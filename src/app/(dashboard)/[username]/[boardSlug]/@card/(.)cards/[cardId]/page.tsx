import { FC } from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DialogWrapper from "./_components/dialog-wrapper";

interface CardModalProps {
  params: {
    username: string;
    boardSlug: string;
    cardId: string;
  };
}

const CardModal: FC<CardModalProps> = ({ params }) => {
  const boardPath = `/${params.username}/${params.boardSlug}`;

  return (
    <DialogWrapper path={boardPath}>
      <DialogHeader>
        <DialogTitle>{params.cardId}</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogWrapper>
  );
};

export default CardModal;
