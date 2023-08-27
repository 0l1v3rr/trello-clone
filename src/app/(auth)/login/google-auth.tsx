import React from "react";
import { BsGoogle } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const GoogleAuth = () => {
  return (
    <Button className="w-full text-white py-7 rounded-lg bg-[#eb483b] hover:bg-[#ff4231]">
      <div className="text-xl mr-2">
        <BsGoogle />
      </div>
      Google
    </Button>
  );
};

export default GoogleAuth;
