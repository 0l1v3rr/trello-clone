"use client";

import React, { FC } from "react";
import { useAuthContext } from "@/context/auth-context";
import { cn, generateInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileDetails from "@/app/(dashboard)/_components/profile/profile-details";

interface ProfileProps {
  className?: string;
}

const Profile: FC<ProfileProps> = ({ className }) => {
  const { user } = useAuthContext();

  return (
    <aside className={cn("flex flex-col items-start gap-4", className)}>
      <Avatar className="aspect-square h-full w-full sm:h-64 sm:w-64">
        <AvatarImage src={user.image ?? undefined} />
        <AvatarFallback className="text-[45vw] sm:text-[9rem]">
          {generateInitials(user.name)}
        </AvatarFallback>
      </Avatar>

      <ProfileDetails />
    </aside>
  );
};

export default Profile;
