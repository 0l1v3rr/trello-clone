import { FC, useState } from "react";
import { Label } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import { generateRandomHex } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface LabelFormProps {
  label?: Label;
  onBack: () => void;
}

const LabelForm: FC<LabelFormProps> = ({ onBack, label }) => {
  const [title, setTitle] = useState(label?.title ?? "");
  const [color, setColor] = useState(label?.color ?? generateRandomHex());

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel className="flex items-center gap-2 text-base">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>

        {label ? "Edit label" : "Create label"}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <div className="w-full px-8 py-3">
        <div
          className="flex-1 cursor-pointer rounded-md px-4 py-2 font-semibold text-background"
          style={{ backgroundColor: color }}
        >
          {title}
        </div>
      </div>
      <DropdownMenuSeparator />

      <div className="flex w-72 flex-col gap-2 p-2">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          placeholder="Color"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <Separator />

        <div className="flex items-center justify-between gap-2">
          <Button
            variant="default"
            onClick={() => {
              onBack();
            }}
          >
            {label ? "Save" : "Create"}
          </Button>

          {label && (
            <Button
              variant="destructive"
              onClick={() => {
                onBack();
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </DropdownMenuContent>
  );
};

export default LabelForm;
