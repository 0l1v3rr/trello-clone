import { FC, useMemo, useState } from "react";
import { useCardContext } from "@/context/card-context";
import { Label } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface LabelListProps {
  onCreateBtnClick: () => void;
  onEditBtnClick: (label: Label) => void;
}

const LabelList: FC<LabelListProps> = ({
  onCreateBtnClick,
  onEditBtnClick,
}) => {
  const { board, card, toggleLabel } = useCardContext();
  const cardLabelIds = card.labels.map((l) => l.id);

  const [searchTerm, setSearchTerm] = useState("");
  const boardLabels = useMemo(() => {
    if (!searchTerm.trim()) return board.labels;

    return board.labels.filter((x) =>
      x.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [board.labels, searchTerm]);

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel className="text-base">Labels</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <div className="flex w-72 flex-col gap-2 p-2">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search labels..."
          className="mb-2"
        />

        {boardLabels.map((label) => (
          <div key={label.id} className="flex items-center gap-1">
            <Checkbox
              id={`cb-${label.id}`}
              checked={cardLabelIds.includes(label.id)}
              className="mr-2 h-6 w-6"
              onCheckedChange={(e) => toggleLabel(label, !e)}
            />
            <label
              htmlFor={`cb-${label.id}`}
              className="flex-1 cursor-pointer rounded-md px-4 py-2 font-semibold text-background"
              style={{ backgroundColor: label.color }}
            >
              {label.title}
            </label>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEditBtnClick(label)}
            >
              <PencilIcon className="w-4" />
            </Button>
          </div>
        ))}

        <Button
          variant="secondary"
          className="mt-2 w-full"
          onClick={onCreateBtnClick}
        >
          Create a new label
        </Button>
      </div>
    </DropdownMenuContent>
  );
};

export default LabelList;
