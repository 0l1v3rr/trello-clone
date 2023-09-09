"use client";

import { FC, PropsWithChildren } from "react";
import { DragDropContext } from "react-beautiful-dnd";

interface BoardContextProps extends PropsWithChildren {}

const BoardContext: FC<BoardContextProps> = ({ children }) => {
  return <DragDropContext onDragEnd={console.log}>{children}</DragDropContext>;
};

export default BoardContext;
