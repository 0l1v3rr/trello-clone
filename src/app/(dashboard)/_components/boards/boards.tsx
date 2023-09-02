import { FC } from "react";
import { getServerSession } from "next-auth";
import { cn } from "@/lib/utils";
import Navigate from "@/components/navigate";
import BoardList from "@/app/(dashboard)/_components/boards/board-list";
import { getUserBoards, getUserGuestBoards } from "@/app/(dashboard)/actions";
import { options } from "@/app/api/auth/[...nextauth]/options";

interface BoardsProps {
  className?: string;
}

const Boards: FC<BoardsProps> = async ({ className }) => {
  const session = await getServerSession(options);
  if (!session) return <Navigate to="/login" />;

  const userBoards = await getUserBoards(session.user.id);
  const guestBoards = await getUserGuestBoards(session.user.id);

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <h2 className="text-2xl font-semibold uppercase">Your Boards</h2>
      <BoardList boards={userBoards} showCreateBoardBtn />

      {guestBoards.length > 0 && (
        <>
          <h2 className="mt-32 text-2xl font-semibold uppercase">
            Guest Boards
          </h2>
          <BoardList boards={guestBoards} />
        </>
      )}
    </div>
  );
};

export default Boards;
