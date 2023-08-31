import React, { FC } from "react";
import { getServerSession } from "next-auth";
import { cn, generateInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileDetails from "@/app/(dashboard)/_components/profile-details";
import { getUserById } from "@/app/(dashboard)/actions";
import { options } from "@/app/api/auth/[...nextauth]/options";

interface ProfileProps {
  className?: string;
}

const Profile: FC<ProfileProps> = async ({ className }) => {
  const session = (await getServerSession(options))!;
  const user = await getUserById(session.user.id);

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

      <ProfileDetails user={user} />
    </aside>
  );
};

export default Profile;
