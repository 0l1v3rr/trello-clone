"use client";

import { useCardContext } from "@/context/card-context";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";

const CardDescription = () => {
  const { card } = useCardContext();
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-muted-foreground">Description</h3>
      <Button
        variant={card.description ? "ghost" : "secondary"}
        className="justify-start"
      >
        <div>
          {card.description
            ? parse(card.description)
            : "Add a more detailed description..."}
        </div>
      </Button>
    </div>
  );
};

export default CardDescription;
