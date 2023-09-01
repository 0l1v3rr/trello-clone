import React from "react";
import { Metadata } from "next";
import Boards from "@/app/(dashboard)/_components/boards/boards";
import Profile from "@/app/(dashboard)/_components/profile/profile";

export const metadata: Metadata = {
  title: "Dashboard",
};

const HomePage = () => {
  return (
    <main className="flex flex-col items-start gap-16 p-8 sm:flex-row sm:p-16">
      <Profile className="w-full sm:w-[18rem]" />
      <Boards />
    </main>
  );
};

export default HomePage;
