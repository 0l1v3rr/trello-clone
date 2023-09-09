"use client";

import { FC, use } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardItem from "@/app/(dashboard)/[username]/[boardSlug]/_components/card/card-item";
import { getCardsByList } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

interface CardsAreaProps {
  listId: string;
}

const CardsArea: FC<CardsAreaProps> = ({ listId }) => {
  const cards = use(getCardsByList(listId));

  return (
    <Droppable droppableId={listId}>
      {(provided) => {
        return (
          <ScrollArea
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-full"
            scrollHideDelay={0}
          >
            {cards?.map((card) => <CardItem key={card.id} card={card} />)}
          </ScrollArea>
        );
      }}
    </Droppable>
  );
};

export default CardsArea;
