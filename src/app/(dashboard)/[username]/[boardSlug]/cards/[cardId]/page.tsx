"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CardPageProps {
  params: {
    username: string;
    boardSlug: string;
    cardId: string;
  };
}

const CardPage: FC<CardPageProps> = ({ params }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(
      `/${params.username}/${params.boardSlug}/cards/${params.cardId}`
    );
  }, [router, params]);

  return null;
};

export default CardPage;
