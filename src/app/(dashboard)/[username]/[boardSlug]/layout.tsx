import { ReactNode } from "react";

export default function BoardLayout(props: {
  children: ReactNode;
  card: ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.card}
    </>
  );
}
