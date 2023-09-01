import React from "react";
import { Metadata } from "next";
import Boards from "@/app/(dashboard)/_components/boards/boards";
import Profile from "@/app/(dashboard)/_components/profile/profile";

export const metadata: Metadata = {
  title: "Dashboard",
};

const HomePage = () => {
  return (
    <main className="flex items-start gap-16 p-16">
      <Profile />
      <Boards />
    </main>
  );
};

export default HomePage;
