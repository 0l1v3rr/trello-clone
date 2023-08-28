import { getServerSession } from "next-auth";
import Navbar from "@/components/navbar/navbar";
import Navigate from "@/components/navigate";
import { options } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  if (!session) return <Navigate to="/login" />;

  return (
    <>
      <Navbar user={session.user} />
      {children}
    </>
  );
}
