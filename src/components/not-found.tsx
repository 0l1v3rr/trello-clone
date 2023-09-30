import React from "react";
import Image from "next/image";
import Link from "next/link";
import notFoundImage from "@/assets/404.svg";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="my-auto flex h-[calc(100vh_-_4.56rem)] w-full flex-col items-center justify-center gap-4">
      <Image className="" src={notFoundImage} alt="Not Found" />
      <Button variant="secondary" asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
};

export default NotFound;
