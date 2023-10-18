"use client";

import { FC } from "react";
import { useBoardListContext } from "@/context/board-list-context";
import { cn } from "@/lib/utils";
import Navigate from "@/components/navigate";
import BoardList from "@/app/(dashboard)/_components/boards/board-list";

interface BoardsProps {
  className?: string;
}

const Boards: FC<BoardsProps> = ({ className }) => {
  const { boardList, guestBoards, session } = useBoardListContext();
  if (!session) return <Navigate to="/login" />;

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <h2 className="text-2xl font-semibold uppercase">Your Boards</h2>
      <BoardList boards={boardList} showCreateBoardBtn />

      {guestBoards.length > 0 && (
        <>
          <h2 className="mt-32 text-2xl font-semibold uppercase">
            Guest Boards
          </h2>
          <BoardList boards={guestBoards} />
        </>
      )}
    </div>
  );
};

export default Boards;
