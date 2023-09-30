"use client";

import { useState } from "react";
import { useCardContext } from "@/context/card-context";
import { Label } from "@prisma/client";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LabelForm from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/_components/labels/label-form";
import LabelList from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/_components/labels/label-list";

const Labels = () => {
  const { card, permission } = useCardContext();
  const [activeDropdown, setActiveDropdown] = useState<"FORM" | "LIST">("LIST");
  const [activeLabel, setActiveLabel] = useState<Label>();

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold text-muted-foreground">Labels</h3>

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

        {permission !== "VISITOR" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <Plus />
              </Button>
            </DropdownMenuTrigger>

            {activeDropdown === "LIST" && (
              <LabelList
                onCreateBtnClick={() => {
                  setActiveDropdown("FORM");
                  setActiveLabel(undefined);
                }}
                onEditBtnClick={(label) => {
                  setActiveDropdown("FORM");
                  setActiveLabel(label);
                }}
              />
            )}
            {activeDropdown === "FORM" && (
              <LabelForm
                label={activeLabel}
                onBack={() => setActiveDropdown("LIST")}
              />
            )}
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Labels;
