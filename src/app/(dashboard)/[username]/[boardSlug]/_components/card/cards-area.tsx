import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ListDetail } from "@/types/board";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardItem from "@/app/(dashboard)/[username]/[boardSlug]/_components/card/card-item";

interface CardsAreaProps {
  listId: string;
  cards: ListDetail["cards"];
}

const CardsArea: FC<CardsAreaProps> = ({ listId, cards }) => {
  return (
    <Droppable droppableId={listId}>
      {(provided) => (
        <ScrollArea
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="h-full"
          scrollHideDelay={0}
        >
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </ScrollArea>
      )}
    </Droppable>
  );
};

export default CardsArea;
