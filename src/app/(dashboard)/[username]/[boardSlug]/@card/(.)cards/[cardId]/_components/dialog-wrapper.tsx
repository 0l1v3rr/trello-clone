"use client";

import { FC, PropsWithChildren } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DialogWrapperProps extends PropsWithChildren {}

const DialogWrapper: FC<DialogWrapperProps> = ({ children }) => {
  return (
    <Dialog open>
      <DialogContent showCloseBtn={false}>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
