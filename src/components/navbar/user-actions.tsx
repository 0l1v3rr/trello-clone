import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context";
import { Lock, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { generateInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserActions = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar>
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>{generateInitials(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col gap-3 pb-2">
          <span className="text-base">My Account</span>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback className="text-base font-normal">
                {generateInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col font-normal">
              <span>{user.name}</span>
              <span className="text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <Lock className="mr-2 h-4 w-4" />
          <span>{user.password ? "Change password" : "Create password"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
