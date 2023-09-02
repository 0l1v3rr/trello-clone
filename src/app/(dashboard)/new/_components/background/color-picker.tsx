import { FC } from "react";
import { generateRandomHex } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ onChange, value }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color</CardTitle>
        <CardDescription>
          The background is a simple solid color.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          variant="secondary"
          size="sm"
          type="button"
          className="whitespace-nowrap"
          onClick={() => onChange(generateRandomHex())}
        >
          Random Color
        </Button>
      </CardContent>
    </Card>
  );
};

export default ColorPicker;
