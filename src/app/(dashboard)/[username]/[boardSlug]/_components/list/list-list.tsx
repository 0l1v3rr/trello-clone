"use client";

import { useBoardContext } from "@/context/board-context";
import ListItem from "@/app/(dashboard)/[username]/[boardSlug]/_components/list/list-item";

const ListList = () => {
  const { lists } = useBoardContext();
  return lists.map((list) => <ListItem key={list.id} list={list} />);
};

export default ListList;
