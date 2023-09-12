"use client";

import { useCardContext } from "@/context/card-context";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LabelList from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/_components/labels/label-list";

const Labels = () => {
  const { card } = useCardContext();

  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-semibold text-muted-foreground">Labels</h3>

      <div className="flex gap-2">
        {card.labels.map((label) => (
          <Badge
            className="rounded-md text-[.9rem] font-semibold"
            key={label.id}
            style={{ backgroundColor: label.color }}
          >
            {label.title}
          </Badge>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <Plus />
            </Button>
          </DropdownMenuTrigger>
          <LabelList />
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Labels;
