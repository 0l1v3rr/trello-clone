import { FC } from "react";
import { List } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ListItemProps {
  list: List;
}

const ListItem: FC<ListItemProps> = ({ list }) => {
  return (
    <Card className="flex h-full min-w-[300px] max-w-[300px] flex-col">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-lg">{list.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-2">
        <ScrollArea className="h-full"></ScrollArea>
      </CardContent>
      <CardFooter className="px-4 py-3">
        <p>Add card</p>
      </CardFooter>
    </Card>
  );
};

export default ListItem;
