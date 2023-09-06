import { FC } from "react";
import Image from "next/image";
import { BoardBackground } from "@/lib/schemas/board";
import { findBoardByUsernameAndSlug } from "@/app/(dashboard)/[username]/[boardSlug]/actions";
import Background from "./_components/background";

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
      <div className="absolute left-0 top-0 isolate z-10 text-white">
        content
      </div>
    </main>
  );
};

export default BoardPage;
