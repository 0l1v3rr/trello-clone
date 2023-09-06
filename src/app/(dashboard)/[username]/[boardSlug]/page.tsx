import { FC } from "react";
import { Board, Label, List, User } from "@prisma/client";
import { BoardBackground } from "@/lib/schemas/board";
import { findBoardByUsernameAndSlug } from "@/app/(dashboard)/[username]/[boardSlug]/actions";
import Background from "./_components/background";
import BoardHeader from "./_components/header/board-header";

export interface BoardDetail extends Board {
  owner: User;
  members: User[];
  labels: Label[];
  lists: List[];
}

interface BoardPageProps {
  params: {
    username: string;
    boardSlug: string;
  };
}

const BoardPage: FC<BoardPageProps> = async ({ params }) => {
  const board = await findBoardByUsernameAndSlug(
    params.username,
    params.boardSlug
  );
  const background = board.background as unknown as BoardBackground;

  return (
    <main className="relative h-[calc(100vh_-_4.56rem)] w-full overflow-x-auto overflow-y-hidden">
      <Background background={background} />
      <div className="absolute left-0 top-0 isolate z-10 w-full text-white">
        <BoardHeader board={board} />
        content
      </div>
    </main>
  );
};

export default BoardPage;
