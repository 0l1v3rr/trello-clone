import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardItem from "@/app/(dashboard)/[username]/[boardSlug]/_components/card/card-item";
import { getCardsByList } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

interface CardsAreaProps {
  listId: string;
}

const CardsArea: FC<CardsAreaProps> = async ({ listId }) => {
  const cards = await getCardsByList(listId);

  return (
    <ScrollArea className="h-full" scrollHideDelay={0}>
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </ScrollArea>
  );
};

export default CardsArea;
