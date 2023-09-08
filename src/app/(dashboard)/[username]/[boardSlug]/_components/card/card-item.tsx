import { FC } from "react";
import Link from "next/link";
import { Card, Label } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CardDetails extends Card {
  labels: Label[];
}

interface CardItemProps {
  card: CardDetails;
}

const CardItem: FC<CardItemProps> = ({ card }) => {
  return (
    <Button
      className="flex h-fit w-full cursor-pointer flex-col items-start gap-2 py-3 [&:not(:last-child)]:mb-2"
      variant="secondary"
      asChild
    >
      <Link href={`/cards/${card.id}`}>
        {card.labels.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {card.labels.map((label) => (
              <Badge key={label.id} style={{ backgroundColor: label.color }}>
                {label.title}
              </Badge>
            ))}
          </div>
        )}

        <span>{card.title}</span>
      </Link>
    </Button>
  );
};

export default CardItem;
