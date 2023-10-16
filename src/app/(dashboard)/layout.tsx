import { redirect } from "next/navigation";
import { AuthContextProvider } from "@/context/auth-context";
import BoardListContextProvider from "@/context/boardList-context";
import { getServerSession } from "next-auth";
import Navbar from "@/components/navbar/navbar";
import {
  getUserBoards,
  getUserById,
  getUserGuestBoards,
} from "@/app/(dashboard)/actions";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (!session) redirect("/login");

  const user = await getUserById(session.user.id);
  const userBoards = await getUserBoards(session.user.id);
  const guestBoards = await getUserGuestBoards(session.user.id);

  return (
    <AuthContextProvider user={user}>
      <BoardListContextProvider
        session={session}
        guestBoards={guestBoards}
        userBoards={userBoards}
      >
        <Navbar />
        {children}
      </BoardListContextProvider>
    </AuthContextProvider>
  );
}
