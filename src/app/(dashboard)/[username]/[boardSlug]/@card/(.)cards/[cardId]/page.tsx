import { FC } from "react";
import { DialogContent } from "@/components/ui/dialog";
import DialogWrapper from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]//_components/dialog-wrapper";
import { getCardDetails } from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/actions";
import CardHeader from "./_components/header/card-header";
import Labels from "./_components/labels";

interface CardModalProps {
  params: {
    username: string;
    boardSlug: string;
    cardId: string;
  };
}

export const revalidate = 10;

const CardModal: FC<CardModalProps> = async ({ params }) => {
  // const boardPath = `/${params.username}/${params.boardSlug}`;
  const card = await getCardDetails(params.cardId);

  return (
    <DialogWrapper>
      <CardHeader card={card} />
      <main className="mt-1 flex flex-col gap-3">
        <Labels card={card} />
      </main>
    </DialogWrapper>
  );
};

export default CardModal;
