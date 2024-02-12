import { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ColorSelectorProps {
  value: string;
  onChange(value: string): void;
}

const ColorSelector: FC<ColorSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {[
        "#fd79a8",
        "#e74c3c",
        "#fd9644",
        "#fed330",
        "#26de81",
        "#2bcbba",
        "#45aaf2",
        "#4b7bec",
        "#a55eea",
        "#d1d8e0",
        "#778ca3",
        "#4b6584",
      ].map((color, i) => (
        <Button
          key={i}
          size="sm"
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
          type="button"
          className={cn(
            value === color &&
              "outline outline-2 outline-offset-2 outline-primary",
            "w-full transition-all"
          )}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
