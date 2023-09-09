import { FC } from "react";
import BoardContext from "@/context/board-context";
import { BoardBackground } from "@/lib/schemas/board";
import Background from "@/app/(dashboard)/[username]/[boardSlug]/_components/background";
import BoardHeader from "@/app/(dashboard)/[username]/[boardSlug]/_components/header/board-header";
import NewList from "@/app/(dashboard)/[username]/[boardSlug]/_components/list/new-list";
import {
  findBoardByUsernameAndSlug,
  getListsByBoardId,
} from "@/app/(dashboard)/[username]/[boardSlug]/actions";
import ListList from "./_components/list/list-list";

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
  const lists = await getListsByBoardId(board.id);
  const background = board.background as unknown as BoardBackground;

  return (
    <main className="relative h-[calc(100vh_-_4.56rem)] w-full overflow-x-auto overflow-y-hidden">
      <Background background={background} />
      <div className="absolute left-0 top-0 isolate z-10 flex h-full w-full flex-col text-white">
        <BoardHeader board={board} />

        <div className="flex h-full flex-1 items-start gap-6 overflow-x-auto p-6">
          <BoardContext board={board} lists={lists}>
            <ListList />
            <NewList />
          </BoardContext>
        </div>
      </div>
    </main>
  );
};

export default BoardPage;
