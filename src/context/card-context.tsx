"use client";

import { createContext, FC, PropsWithChildren, useContext } from "react";
import { BoardDetail, CardDetail } from "@/types/board";

interface CardContextProps {
  card: CardDetail;
  board: BoardDetail;
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
  board,
  card,
}) => {
  return (
    <CardContext.Provider value={{ card, board }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;
