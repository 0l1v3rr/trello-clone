"use client";

import { FC } from "react";
import Link from "next/link";
import { useBoardContext } from "@/context/board-context";
import { Draggable } from "react-beautiful-dnd";
import { ListDetail } from "@/types/board";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CardItemProps {
  card: ListDetail["cards"][0];
  index: number;
}

const CardItem: FC<CardItemProps> = ({ card, index }) => {
  const { path } = useBoardContext();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <Button
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={cn(
            "mb-2 flex h-fit w-full cursor-pointer select-none flex-col items-start gap-2 py-3"
          )}
          variant="secondary"
          asChild
        >
          <Link href={`${path}/cards/${card.id}`}>
            {card.labels.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {card.labels.map((label) => (
                  <Badge
                    key={label.id}
                    style={{ backgroundColor: label.color }}
                  >
                    {label.title}
                  </Badge>
                ))}
              </div>
            )}

            <span>{card.title}</span>
          </Link>
        </Button>
      )}
    </Draggable>
  );
};

export default CardItem;
