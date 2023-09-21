"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { Label } from "@prisma/client";
import { BoardDetail, CardDetail } from "@/types/board";
import {
  addCardLabel,
  getCardDetails,
  removeCardLabel,
} from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/actions";
import { findBoardById } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

interface CardContextProps {
  card: CardDetail;
  board: BoardDetail;
  path: string;
  toggleLabel: (label: Label, remove: boolean) => void;
  revalidateCard: () => Promise<void>;
  revalidateBoard: () => Promise<void>;
}

const CardContext = createContext<CardContextProps>({} as CardContextProps);

export function useCardContext() {
  return useContext(CardContext) as CardContextProps;
}

interface CardContextProviderProps extends PropsWithChildren {
  card: CardDetail;
  board: BoardDetail;
}

const CardContextProvider: FC<CardContextProviderProps> = ({
  children,
  board: initialBoard,
  card: initialCard,
}) => {
  const [card, setCard] = useState(initialCard);
  const [board, setBoard] = useState(initialBoard);
  const path = `/${board.owner.username}/${board.slug}/cards/${card.id}`;

  const toggleLabel = (label: Label, remove: boolean) => {
    setCard((prev) => {
      const newCard = structuredClone(prev);

      if (remove) {
        newCard.labels = prev.labels.filter((x) => x.id !== label.id);
        removeCardLabel(prev.id, label.id);
      } else {
        newCard.labels.push(label);
        addCardLabel(prev.id, label.id);
      }

      return newCard;
    });
  };

  const revalidateCard = async () => {
    const revalidatedBoard = await getCardDetails(card.id);
    setCard(revalidatedBoard);
  };

  const revalidateBoard = async () => {
    const revalidatedBoard = await findBoardById(board.id);
    setBoard(revalidatedBoard);
  };

  return (
    <CardContext.Provider
      value={{
        card,
        board,
        path,
        toggleLabel,
        revalidateCard,
        revalidateBoard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;
