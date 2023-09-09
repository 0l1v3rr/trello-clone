"use client";

import { createContext, FC, PropsWithChildren, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { BoardDetail, ListDetail } from "@/types/board";

interface BoardContextProps {
  board: BoardDetail;
  lists: ListDetail[];
  path: string;
}

const BoardContext = createContext<BoardContextProps>({} as BoardContextProps);

export function useBoardContext() {
  return useContext(BoardContext) as BoardContextProps;
}

interface BoardContextProviderProps extends PropsWithChildren {
  board: BoardDetail;
  lists: ListDetail[];
}

const BoardContextProvider: FC<BoardContextProviderProps> = ({
  children,
  board,
  lists,
}) => {
  const path = `/${board.owner.name}/${board.slug}`;

  return (
    <BoardContext.Provider value={{ board, lists, path }}>
      <DragDropContext onDragEnd={console.log}>{children}</DragDropContext>
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
