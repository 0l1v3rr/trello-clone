import { FC, useState } from "react";
import { BoardBackground } from "@/lib/schemas/board";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPicker from "@/app/(dashboard)/new/_components/background/color-picker";
import ImagePicker from "@/app/(dashboard)/new/_components/background/image-picker";

interface BackgroundSelectProps {
  value: BoardBackground;
  onChange: (value: BoardBackground) => void;
}

type Type = "color" | "image";

const BackgroundSelect: FC<BackgroundSelectProps> = ({ value, onChange }) => {
  const [colorValue, setColorValue] = useState(value.value);
  const [imageValue, setImageValue] = useState("");

  return (
    <Tabs
      onValueChange={(val) =>
        onChange({
          value: val === "image" ? imageValue : colorValue,
          type: val as Type,
        })
      }
      defaultValue="color"
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="color">Color</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
      </TabsList>
      <TabsContent value="color">
        <ColorPicker
          value={colorValue}
          onChange={(val) => {
            setColorValue(val);
            if (value.type === "color") {
              onChange({ ...value, value: val });
            }
          }}
        />
      </TabsContent>
      <TabsContent value="image">
        <ImagePicker
          value={imageValue}
          onChange={(val) => {
            setImageValue(val);
            if (value.type === "image") {
              onChange({ ...value, value: val });
            }
          }}
        />
      </TabsContent>
    </Tabs>
  );
};

export default BackgroundSelect;
