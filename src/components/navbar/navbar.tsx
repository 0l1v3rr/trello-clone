"use client";

import { FC } from "react";
import type { Session } from "next-auth";
import { ThemeToggle } from "@/components/navbar/theme-toggle";
import UserActions from "@/components/navbar/user-actions";

interface NavbarProps {
  user: Session["user"];
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="w-full bg-background border-b border-border flex gap-2 px-6 py-4 items-center">
      Navbar
      <div className="flex gap-4 items-center ml-auto">
        <ThemeToggle />
        <UserActions user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
