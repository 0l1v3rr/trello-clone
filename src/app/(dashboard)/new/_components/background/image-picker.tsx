import { FC, useCallback, useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ImagePickerProps {
  value: string;
  onChange: (image: string) => void;
}

const ImagePicker: FC<ImagePickerProps> = ({ value, onChange }) => {
  const [loading, startTransition] = useTransition();

  const getRandomImage = useCallback(() => {
    startTransition(async () => {
      const res = await fetch(
        "https://source.unsplash.com/random/1920x1080?landscape,wallpaper,background"
      );
      onChange(res.url);
    });
  }, [onChange]);

  useEffect(() => {
    if (value.length < 1) {
      getRandomImage();
    }
  }, [getRandomImage, value.length]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          The background is a beautiful image from{" "}
          <Link
            href="https://unsplash.com/"
            className="font-semibold hover:underline"
          >
            unsplash
          </Link>
          .
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={value}
          alt="Random Image"
          width={486}
          height={273}
          className="aspect-video rounded-md border object-cover"
          priority
        />
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={getRandomImage}
          disabled={loading}
        >
          Random Image
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImagePicker;
