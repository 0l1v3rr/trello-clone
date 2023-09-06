import { FC } from "react";
import Image from "next/image";
import { BoardBackground } from "@/lib/schemas/board";

interface BackgroundProps {
  background: BoardBackground;
}

const Background: FC<BackgroundProps> = ({ background }) => {
  if (background.type === "color") {
    return (
      <div
        className="absolute inset-0"
        style={{ backgroundColor: background.value }}
      />
    );
  }

  return (
    <Image
      className="absoulte inset-0 h-full w-full object-cover object-center"
      width={1920}
      height={1080}
      src={background.value}
      alt="Board Background Image"
    />
  );
};

export default Background;
