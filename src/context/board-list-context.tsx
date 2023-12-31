"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { type Session } from "next-auth";
import { BoardWithOwner } from "@/components/navbar/dropdowns/boards-dropdown";

interface BoardListContextProps {
  boardList: BoardWithOwner[];
  guestBoards: BoardWithOwner[];
  setBoardList: (boards: BoardWithOwner[]) => void;
  session: Session | null;
  setGuestBoard: (boards: BoardWithOwner[]) => void;
}

export const BoardListContext = createContext<BoardListContextProps>({
  boardList: [],
  guestBoards: [],
  setBoardList: () => {},
  session: null,
  setGuestBoard: () => {},
});

export function useBoardListContext() {
  return useContext(BoardListContext) as BoardListContextProps;
}

interface BoardListContextProviderProps extends PropsWithChildren {
  userBoards: BoardWithOwner[];
  guestBoards: BoardWithOwner[];
  session: Session | null;
}
const BoardListContextProvider: FC<BoardListContextProviderProps> = ({
  children,
  session,
  userBoards,
  guestBoards,
}) => {
  const [boardList, setBoardList] = useState<BoardWithOwner[]>(userBoards);
  const [userGuestBoards, setGuestBoard] =
    useState<BoardWithOwner[]>(guestBoards);

  return (
    <BoardListContext.Provider
      value={{
        boardList,
        setBoardList,
        guestBoards: userGuestBoards,
        session,
        setGuestBoard,
      }}
    >
      {children}
    </BoardListContext.Provider>
  );
};

export default BoardListContextProvider;
