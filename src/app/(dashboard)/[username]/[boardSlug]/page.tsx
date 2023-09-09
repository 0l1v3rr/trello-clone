import { FC } from "react";
import BoardContext from "@/context/board-context";
import { Board, Label, List, User } from "@prisma/client";
import { BoardBackground } from "@/lib/schemas/board";
import Background from "@/app/(dashboard)/[username]/[boardSlug]/_components/background";
import BoardHeader from "@/app/(dashboard)/[username]/[boardSlug]/_components/header/board-header";
import ListItem from "@/app/(dashboard)/[username]/[boardSlug]/_components/list/list-item";
import NewList from "@/app/(dashboard)/[username]/[boardSlug]/_components/list/new-list";
import { findBoardByUsernameAndSlug } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

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
  const path = `/${params.username}/${params.boardSlug}`;

  return (
    <main className="relative h-[calc(100vh_-_4.56rem)] w-full overflow-x-auto overflow-y-hidden">
      <Background background={background} />
      <div className="absolute left-0 top-0 isolate z-10 flex h-full w-full flex-col text-white">
        <BoardHeader board={board} />

        <div className="flex h-full flex-1 items-start gap-6 overflow-x-auto p-6">
          <BoardContext>
            {board.lists.map((list) => (
              <ListItem key={list.id} list={list} path={path} />
            ))}
            <NewList board={board} />
          </BoardContext>
        </div>
      </div>
    </main>
  );
};

export default BoardPage;
