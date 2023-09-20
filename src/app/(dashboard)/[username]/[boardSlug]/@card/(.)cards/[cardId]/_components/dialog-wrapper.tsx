"use client";

import { FC, PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { useCardContext } from "@/context/card-context";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DialogWrapperProps extends PropsWithChildren {}

const DialogWrapper: FC<DialogWrapperProps> = ({ children }) => {
  const router = useRouter();
  const { board } = useCardContext();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (open) {
          router.push(`/${board.owner.username}/${board.slug}`);
          router.refresh();
        }
      }}
    >
      <DialogContent showCloseBtn={false}>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
