import { FC } from "react";
import CardContextProvider from "@/context/card-context";
import CardDescription from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/_components/description/card-description";
import DialogWrapper from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/_components/dialog-wrapper";
import CardHeader from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/_components/header/card-header";
import Labels from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/_components/labels/labels";
import { getCardDetails } from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/actions";
import { findBoardByUsernameAndSlug } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

interface CardModalProps {
  params: {
    username: string;
    boardSlug: string;
    cardId: string;
  };
}

export const revalidate = 10;

const CardModal: FC<CardModalProps> = async ({ params }) => {
  const card = await getCardDetails(params.cardId);
  const board = await findBoardByUsernameAndSlug(
    params.username,
    params.boardSlug
  );

  return (
    <CardContextProvider card={card} board={board}>
      <DialogWrapper>
        <CardHeader />
        <main className="mt-1 flex flex-col gap-6">
          <Labels />
          <CardDescription />
        </main>
      </DialogWrapper>
    </CardContextProvider>
  );
};

export default CardModal;
