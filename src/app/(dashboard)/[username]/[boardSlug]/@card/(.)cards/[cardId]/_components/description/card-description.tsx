"use client";

import { useState } from "react";
import { useCardContext } from "@/context/card-context";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DescriptionWysiwyg from "@/app/(dashboard)/[username]/[boardSlug]/@card/(.)cards/[cardId]/_components/description/description-wysiwyg";

const CardDescription = () => {
  const { card, permission } = useCardContext();
  const [descriptionEdit, setDescriptionEdit] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-muted-foreground">
        Description
      </h3>
      {descriptionEdit ? (
        <DescriptionWysiwyg onReturn={() => setDescriptionEdit(false)} />
      ) : (
        <Button
          disabled={permission === "VISITOR"}
          variant={card.description ? "ghost" : "secondary"}
          className="h-fit justify-start"
          onClick={() => setDescriptionEdit(true)}
        >
          <div
            className={cn(
              "flex flex-col items-start",
              card.description && "text-base"
            )}
          >
            {card.description
              ? parse(card.description)
              : "Add a more detailed description..."}
          </div>
        </Button>
      )}
    </div>
  );
};

export default CardDescription;
