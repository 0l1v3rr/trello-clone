"use client";

import { FC } from "react";
import { useBoardContext } from "@/context/board-context";
import { Button } from "@/components/ui/button";
import EditableTitle from "@/components/editable-title";
import FullscreenButton from "@/app/(dashboard)/[username]/[boardSlug]/_components/header/fullscreen-button";
import MemberList from "@/app/(dashboard)/[username]/[boardSlug]/_components/header/member-list";
import { updateBoard } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

interface BoardHeaderProps {}

const BoardHeader: FC<BoardHeaderProps> = () => {
  const { board, permission } = useBoardContext();

  return (
    <header className="flex w-screen items-center gap-2 bg-background/10 px-8 py-4 backdrop-blur-sm dark:bg-background/50">
      <h1 className="mr-auto text-xl font-semibold">
        <EditableTitle
          title={board.name}
          className="w-fit text-xl font-semibold"
          onSave={(name) => updateBoard(board.id, { name })}
        />
      </h1>

      <FullscreenButton />
      <div className="h-[35px] w-[1px] bg-border" />

      <div className="flex items-center gap-4">
        <MemberList members={board.members} owner={board.owner} />

        {permission === "OWNER" && (
          <Button variant="secondary" size="sm">
            Add Member
          </Button>
        )}
      </div>
    </header>
  );
};

export default BoardHeader;
