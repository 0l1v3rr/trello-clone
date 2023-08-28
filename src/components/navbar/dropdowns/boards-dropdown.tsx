import React, { FC, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import boardImage from "@/assets/board.svg";
import { Board, User } from "@prisma/client";
import { ChevronDown, Loader2 } from "lucide-react";
import { type Session } from "next-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BoardMenuItem from "@/components/boards/board-menu-item";
import { getUserBoards } from "@/components/navbar/actions";

export type BoardWithOwner = Board & { owner: User };

interface BoardsDropdownProps {
  user: Session["user"];
}

const BoardsDropdown: FC<BoardsDropdownProps> = ({ user }) => {
  const [loading, startTransition] = useTransition();
  const [boards, setBoards] = useState<BoardWithOwner[]>([]);

  useEffect(() => {
    startTransition(async () => {
      const boards = await getUserBoards(user.id);
      setBoards(boards);
    });
  }, [user.id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="outline">
          Boards
          <ChevronDown className="ml-3 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Boards</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {loading ? (
          <Loader2 className="mx-auto my-2 animate-spin" />
        ) : boards.length > 0 ? (
          boards.map((board) => <BoardMenuItem key={board.id} board={board} />)
        ) : (
          <div className="p-2 text-center text-sm">
            <Image
              src={boardImage}
              alt="Board Image"
              width={220}
              height={120}
              className="mb-2 h-[120px] rounded-md border object-cover"
            />
            <span>You don&apos;t have any boards yet.</span>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BoardsDropdown;
