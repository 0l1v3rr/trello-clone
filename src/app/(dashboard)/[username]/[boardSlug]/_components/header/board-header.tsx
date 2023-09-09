import { FC } from "react";
import { BoardDetail } from "@/types/board";
import { Button } from "@/components/ui/button";
import MemberList from "@/app/(dashboard)/[username]/[boardSlug]/_components/header/member-list";

interface BoardHeaderProps {
  board: BoardDetail;
}

const BoardHeader: FC<BoardHeaderProps> = ({ board }) => {
  return (
    <header className="flex w-screen items-center justify-between gap-2 bg-background/10 px-8 py-4 backdrop-blur-sm dark:bg-background/50">
      <h1 className="text-xl font-semibold">{board.name}</h1>

      <div className="flex items-center gap-4">
        <MemberList members={board.members} owner={board.owner} />
        <div className="h-[35px] w-[1px] bg-border" />
        <Button variant="secondary" size="sm">
          Invite
        </Button>
      </div>
    </header>
  );
};

export default BoardHeader;
