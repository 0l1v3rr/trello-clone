"use client";

import {
  FC,
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from "react";
import { useRouter } from "next/navigation";

interface NavigateProps {
  to: string;
}

const Navigate: FC<NavigateProps> = ({ to }) => {
  const router = useRouter();

  const redirect = useEffectEvent(() => {
    router.push(to);
  });

  useEffect(() => redirect(), [redirect]);

  return null;
};

export default Navigate;
