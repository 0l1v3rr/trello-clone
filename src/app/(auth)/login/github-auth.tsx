"use client";

import React, { FC } from "react";
import { useSearchParams } from "next/navigation";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface GitHubAuthProps {
  github?: ClientSafeProvider;
}

const GithubAuth: FC<GitHubAuthProps> = ({ github }) => {
  const params = useSearchParams();

  return (
    <Button
      className="w-full rounded-lg bg-[#010409] py-7 text-white hover:bg-black"
      onClick={() =>
        signIn(github?.id, {
          callbackUrl: params.get("callbackUrl") ?? "/",
        })
      }
    >
      <div className="mr-2 text-xl">
        <FaGithub />
      </div>
      GitHub
    </Button>
  );
};

export default GithubAuth;
