import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { JsonImage } from "@/types/board";
import { BoardWithOwner } from "../navbar/dropdowns/boards-dropdown";

interface BoardItemProps {
  board: BoardWithOwner;
}

const BoardItem: FC<BoardItemProps> = ({ board }) => {
  const image = board.image as unknown as JsonImage;

  return (
    <Link
      href={`${board.owner.username}/${board.slug}`}
      className="relative cursor-pointer overflow-hidden rounded-md border"
    >
      {image.type === "color" ? (
        <div
          className="aspect-[16/8] w-full"
          style={{
            backgroundColor: image.value,
          }}
        />
      ) : (
        <Image
          src={image.value}
          alt="Board Image"
          width={500}
          height={100}
          className="aspect-[16/8] w-full object-cover transition-all hover:scale-105"
        />
      )}

      <h3 className="absolute left-4 top-2 text-xl font-semibold text-white">
        {board.name}
      </h3>
    </Link>
  );
};

export default BoardItem;
