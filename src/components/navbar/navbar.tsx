"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import boardImage from "@/assets/board.svg";
import logo from "@/assets/logo.svg";
import starImage from "@/assets/star.svg";
import type { Session } from "next-auth";
import { getStarredBoards, getUserBoards } from "@/components/navbar/actions";
import CreateButton from "@/components/navbar/create-button";
import BoardsDropdown from "@/components/navbar/dropdowns/boards-dropdown";
import { ThemeToggle } from "@/components/navbar/dropdowns/theme-toggle";
import UserActions from "@/components/navbar/user-actions";

interface NavbarProps {
  user: Session["user"];
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="flex w-full items-center gap-8 border-b border-border bg-background px-8 py-4">
      <Link href="/" className="flex items-center gap-3 text-xl font-semibold">
        <Image width={38} height={38} src={logo} alt="Logo" />
        Trello Clone
      </Link>

      <div className="flex items-center gap-3">
        <BoardsDropdown
          image={boardImage}
          menuLabel="Boards"
          getBoards={() => getUserBoards(user.id)}
        />
        <BoardsDropdown
          image={starImage}
          menuLabel="Starred"
          getBoards={() => getStarredBoards(user.id)}
        />
        <CreateButton />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />
        <UserActions user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
