import { FC } from "react";
import BoardContext from "@/context/board-context";
import Board from "@/app/(dashboard)/[username]/[boardSlug]/_components/board";
import {
  findBoardByUsernameAndSlug,
  getBoardUserPermission,
  getListsByBoardId,
} from "@/app/(dashboard)/[username]/[boardSlug]/actions";

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
  const permission = await getBoardUserPermission(board);

  return (
    <BoardContext board={board} lists={lists} permission={permission}>
      <Board />
    </BoardContext>
  );
};

export default BoardPage;
