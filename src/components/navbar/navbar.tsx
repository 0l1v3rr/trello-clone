"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/_assets/logo.svg";
import type { Session } from "next-auth";
import CreateButton from "@/components/navbar/create-button";
import { ThemeToggle } from "@/components/navbar/theme-toggle";
import UserActions from "@/components/navbar/user-actions";
import BoardsDropdown from "./boards-dropdown";
import StarredDropdown from "./starred-dropdown";

interface NavbarProps {
  user: Session["user"];
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="w-full bg-background border-b border-border flex gap-8 px-8 py-4 items-center">
      <Link href="/" className="font-semibold flex items-center gap-3 text-xl">
        <Image width={38} height={38} src={logo} alt="Logo" />
        Trello Clone
      </Link>

      <div className="flex items-center gap-3">
        <BoardsDropdown />
        <StarredDropdown />
        <CreateButton />
      </div>

      <div className="flex gap-4 items-center ml-auto">
        <ThemeToggle />
        <UserActions user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
