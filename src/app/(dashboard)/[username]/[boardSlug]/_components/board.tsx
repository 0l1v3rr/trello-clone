"use client";

import { FC } from "react";
import { useBoardContext } from "@/context/board-context";
import { FullscreenContextProvider } from "@/context/fullscreen-context";
import { BoardBackground } from "@/lib/schemas/board";
import Background from "@/app/(dashboard)/[username]/[boardSlug]/_components/background";
import BoardHeader from "@/app/(dashboard)/[username]/[boardSlug]/_components/header/board-header";
import ListList from "@/app/(dashboard)/[username]/[boardSlug]/_components/list/list-list";
import NewList from "@/app/(dashboard)/[username]/[boardSlug]/_components/list/new-list";

interface BoardProps {}

const Board: FC<BoardProps> = ({}) => {
  const { permission, board } = useBoardContext();
  const background = board.background as unknown as BoardBackground;

  return (
    <FullscreenContextProvider<HTMLDivElement>>
      {(ref) => (
        <main
          ref={ref}
          className="relative h-[calc(100vh_-_4.56rem)] w-full overflow-x-auto overflow-y-hidden"
        >
          <Background background={background} />
          <div className="absolute left-0 top-0 isolate z-10 flex h-full w-full flex-col text-white">
            <BoardHeader />

            <div className="flex h-full flex-1 items-start gap-6 overflow-x-auto p-6">
              <ListList />
              {permission !== "VISITOR" && <NewList />}
            </div>
          </div>
        </main>
      )}
    </FullscreenContextProvider>
  );
};

export default Board;
