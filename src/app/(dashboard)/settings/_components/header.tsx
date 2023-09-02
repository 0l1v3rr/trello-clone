"use client";

import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import { generateInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user } = useAuthContext();

  return (
    <header className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback className="text-[1.8rem]">
            {generateInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">
            {user.name}{" "}
            <span className="text-muted-foreground">({user.email})</span>
          </h1>
          <span className="text-sm italic">
            {user.role === "USER" ? "Personal" : "Admin"} account
          </span>
        </div>
      </div>

      <Button variant="secondary" size="sm" asChild>
        <Link href="/">Go back to your dashboard</Link>
      </Button>
    </header>
  );
};

export default Header;
