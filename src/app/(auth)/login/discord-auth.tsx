"use client";

import React, { FC } from "react";
import { useSearchParams } from "next/navigation";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { BsDiscord } from "react-icons/bs";
import { Button } from "@/components/ui/button";

interface DiscordAuthProps {
  discord?: ClientSafeProvider;
}

const DiscordAuth: FC<DiscordAuthProps> = ({ discord }) => {
  const params = useSearchParams();

  return (
    <Button
      className="w-full rounded-lg bg-[#5d6feb] py-7 text-white hover:bg-[#768dda]"
      onClick={() =>
        signIn(discord?.id, {
          callbackUrl: params.get("callbackUrl") ?? "/",
        })
      }
    >
      <div className="mr-2 text-xl">
        <BsDiscord />
      </div>
      Discord
    </Button>
  );
};

export default DiscordAuth;
