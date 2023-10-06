"use client";

import { FC, Suspense } from "react";
import { useBoardContext } from "@/context/board-context";
import { ListDetail } from "@/types/board";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import CardSkeleton from "@/app/(dashboard)/[username]/[boardSlug]/_components/card/card-skeleton";
import CardsArea from "@/app/(dashboard)/[username]/[boardSlug]/_components/card/cards-area";
import NewCard from "@/app/(dashboard)/[username]/[boardSlug]/_components/card/new-card";
import ListTitle from "./list-title";

interface ListItemProps {
  list: ListDetail;
}

const ListItem: FC<ListItemProps> = ({ list }) => {
  const { permission } = useBoardContext();

  return (
    <Card className="flex h-full min-w-[300px] max-w-[300px] flex-col">
      <CardHeader className="p-2">
        <ListTitle listId={list.id} title={list.title} />
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
