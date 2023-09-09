import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ListDetail } from "@/types/board";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardItem from "@/app/(dashboard)/[username]/[boardSlug]/_components/card/card-item";

interface CardsAreaProps {
  listId: string;
  cards: ListDetail["cards"];
}

const CardsArea: FC<CardsAreaProps> = ({ listId, cards }) => {
  return (
    <Droppable droppableId={listId}>
      {(provided, { isDraggingOver }) => (
        <ScrollArea
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={cn(
            "h-full rounded-md",
            isDraggingOver && "bg-primary/[.035]"
          )}
          scrollHideDelay={0}
        >
          {cards.map((card, i) => (
            <CardItem key={card.id} card={card} index={i} />
          ))}
          {provided.placeholder}
        </ScrollArea>
      )}
    </Droppable>
  );
};

export default CardsArea;
