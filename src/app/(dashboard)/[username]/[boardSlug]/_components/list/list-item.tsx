"use client";

import { FC, Suspense } from "react";
import { useBoardContext } from "@/context/board-context";
import { ListDetail } from "@/types/board";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditableTitle from "@/components/editable-title";
import CardSkeleton from "@/app/(dashboard)/[username]/[boardSlug]/_components/card/card-skeleton";
import CardsArea from "@/app/(dashboard)/[username]/[boardSlug]/_components/card/cards-area";
import NewCard from "@/app/(dashboard)/[username]/[boardSlug]/_components/card/new-card";
import { updateList } from "@/app/(dashboard)/[username]/[boardSlug]/actions";

interface ListItemProps {
  list: ListDetail;
}

const ListItem: FC<ListItemProps> = ({ list }) => {
  const { permission } = useBoardContext();

  return (
    <Card className="flex h-full min-w-[300px] max-w-[300px] flex-col">
      <CardHeader className="p-2">
        <CardTitle>
          <EditableTitle
            title={list.title}
            onSave={(title) => updateList(list.id, { title })}
            className="text-lg font-semibold"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-2">
        <Suspense fallback={<CardSkeleton />}>
          <CardsArea cards={list.cards} listId={list.id} />
        </Suspense>
      </CardContent>
      {permission !== "VISITOR" && (
        <CardFooter className="p-2">
          <NewCard list={list} />
        </CardFooter>
      )}
    </Card>
  );
};

export default ListItem;
