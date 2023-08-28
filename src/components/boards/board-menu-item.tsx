import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JsonImage } from "@/types/board";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { BoardWithOwner } from "@/components/navbar/dropdowns/boards-dropdown";

interface BoardMenuItemProps {
  board: BoardWithOwner;
}

const BoardMenuItem: FC<BoardMenuItemProps> = ({ board }) => {
  const router = useRouter();
  const image = board.image as unknown as JsonImage;

  return (
    <DropdownMenuItem
      onClick={() => router.push(`/${board.owner.username}/${board.slug}`)}
    >
      <div className="flex items-center gap-2">
        {image.type === "color" ? (
          <div
            className="h-[40px] w-[70px] rounded-md border border-border"
            style={{
              backgroundColor: image.value,
            }}
          />
        ) : (
          <Image
            src={image.value}
            alt="Board Image"
            width={70}
            height={40}
            className="h-[40px] w-[70px] rounded-md border border-border object-cover"
          />
        )}

        <div className="flex flex-col pr-8">
          <span className="font-semibold">{board.name}</span>
          <span className="text-muted-foreground">
            {board.owner.username}/{board.slug}
          </span>
        </div>
      </div>
    </DropdownMenuItem>
  );
};

export default BoardMenuItem;
