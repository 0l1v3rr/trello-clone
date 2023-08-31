import React from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Profile from "./_components/profile";

export const metadata: Metadata = {
  title: "Dashboard",
};

const HomePage = () => {
  return (
    <main className="flex items-start gap-8 px-16 py-8">
      <Profile />
      <Button>Hello</Button>
    </main>
  );
};

export default HomePage;
