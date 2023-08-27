import React from "react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const GithubAuth = () => {
  return (
    <Button className="w-full text-white py-7 rounded-lg bg-[#010409] hover:bg-black">
      <div className="text-xl mr-2">
        <FaGithub />
      </div>
      GitHub
    </Button>
  );
};

export default GithubAuth;
