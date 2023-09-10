import { Board, Card, Label, List, User } from "@prisma/client";

export interface BoardDetail extends Board {
  owner: User;
  members: User[];
  labels: Label[];
}

export interface ListDetail extends List {
  cards: (Card & { labels: Label[] })[];
}

export interface CardDetail extends Card {
  list: List;
  labels: Label[];
}
