"use client";

import { FC, PropsWithChildren } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DialogWrapperProps extends PropsWithChildren {}

const DialogWrapper: FC<DialogWrapperProps> = ({ children }) => {
  return (
    <Dialog open>
      <DialogContent
        showCloseBtn={false}
        className="w-[900px] max-w-[min(900px,100%)]"
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
