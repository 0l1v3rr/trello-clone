import React, { FC, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Board, User } from "@prisma/client";
import { ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BoardMenuItem from "@/components/boards/board-menu-item";

export type BoardWithOwner = Board & { owner: User };

interface BoardsDropdownProps {
  menuLabel: string;
  getBoards: () => Promise<BoardWithOwner[]>;
  image: any;
}

const BoardsDropdown: FC<BoardsDropdownProps> = ({
  menuLabel,
  getBoards,
  image,
}) => {
  const [loading, startTransition] = useTransition();
  const [boards, setBoards] = useState<BoardWithOwner[]>([]);

  useEffect(() => {
    startTransition(async () => {
      const boards = await getBoards();
      setBoards(boards);
    });
  }, [getBoards]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="outline">
          {menuLabel}
          <ChevronDown className="ml-3 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {loading ? (
          <Loader2 className="mx-auto my-2 animate-spin" />
        ) : boards.length > 0 ? (
          boards.map((board) => <BoardMenuItem key={board.id} board={board} />)
        ) : (
          <div className="p-2 text-center text-sm">
            <Image
              src={image}
              alt="Board Image"
              width={220}
              height={120}
              className="mx-auto mb-2 h-[120px] rounded-md object-cover"
            />
            <span>You don&apos;t have anything here yet.</span>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BoardsDropdown;
