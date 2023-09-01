import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BoardItem from "@/components/boards/board-item";
import { BoardWithOwner } from "@/components/navbar/dropdowns/boards-dropdown";

interface BoardListProps {
  boards: BoardWithOwner[];
  showCreateBoardBtn?: boolean;
}

const BoardList: FC<BoardListProps> = async ({
  boards,
  showCreateBoardBtn = false,
}) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {boards.map((board) => (
        <BoardItem key={board.id} board={board} />
      ))}

      {showCreateBoardBtn && (
        <Button
          variant="secondary"
          className="aspect-[16/8] h-full w-full rounded-md border bg-muted"
          asChild
        >
          <Link href="/new">Create new board</Link>
        </Button>
      )}
    </div>
  );
};

export default BoardList;
