"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  experimental_useOptimistic as useOptimistic,
} from "react";
import { CardDetail } from "@/types/board";

interface CardContextProps {
  card: CardDetail;
}

const CardContext = createContext<CardContextProps>({} as CardContextProps);

export function useCardContext() {
  return useContext(CardContext) as CardContextProps;
}

interface CardContextProviderProps extends PropsWithChildren {
  card: CardDetail;
}

const CardContextProvider: FC<CardContextProviderProps> = ({
  children,
  card,
}) => {
  return (
    <CardContext.Provider value={{ card }}>{children}</CardContext.Provider>
  );
};

export default CardContextProvider;
