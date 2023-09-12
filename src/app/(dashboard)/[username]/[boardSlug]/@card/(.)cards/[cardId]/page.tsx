import { FC } from "react";
import CardContextProvider from "@/context/card-context";
import DialogWrapper from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]//_components/dialog-wrapper";
import { getCardDetails } from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/actions";
import CardDescription from "./_components/description/card-description";
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
    <CardContextProvider card={card}>
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
