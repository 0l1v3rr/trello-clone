"use client";

import React, { FC } from "react";
import { useAuthContext } from "@/context/auth-context";
import { cn, generateInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileDetails from "@/app/(dashboard)/_components/profile-details";

interface ProfileProps {
  className?: string;
}

const Profile: FC<ProfileProps> = ({ className }) => {
  const { user } = useAuthContext();

  return (
    <aside
      className={cn("flex max-w-[16rem] flex-col items-start gap-4", className)}
    >
      <Avatar className="h-64 w-64">
        <AvatarImage src={user.image ?? undefined} />
        <AvatarFallback className="text-[8rem]">
          {generateInitials(user.name)}
        </AvatarFallback>
      </Avatar>

      <ProfileDetails />
    </aside>
  );
};

export default Profile;
