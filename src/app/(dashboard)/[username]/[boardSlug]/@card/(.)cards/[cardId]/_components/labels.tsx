import { FC } from "react";
import { Plus } from "lucide-react";
import { CardDetail } from "@/types/board";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LabelsProps {
  card: CardDetail;
}

const Labels: FC<LabelsProps> = ({ card }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-semibold text-muted-foreground">Labels</h3>

      <div className="flex gap-2">
        {card.labels.map((label) => (
          <Badge
            className="rounded-md text-[.9rem]"
            key={label.id}
            style={{ backgroundColor: label.color }}
          >
            {label.title}
          </Badge>
        ))}
        <Button variant="secondary" size="icon">
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default Labels;
