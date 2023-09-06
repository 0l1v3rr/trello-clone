import { FC } from "react";
import { User } from "@prisma/client";
import { generateInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface MemberListProps {
  members: User[];
  owner: User;
}

const MemberList: FC<MemberListProps> = ({ owner, members }) => {
  return (
    <div className="flex items-center gap-2">
      {members.map((member) => (
        <Member key={member.id} owner={false} user={member} />
      ))}

      <Member owner={true} user={owner} />
    </div>
  );
};

const Member = ({ user, owner }: { user: User; owner: boolean }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback>{generateInitials(user.name)}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-semibold">{user.name}</h4>
            <Badge variant="secondary">{owner ? "Owner" : "Member"}</Badge>
          </div>
          <a
            href={`mailto:${user.email}`}
            className="text-muted-foreground hover:underline"
          >
            {user.email}
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MemberList;
