"use client";

import { FC, PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DialogWrapperProps extends PropsWithChildren {
  path: string;
}

const DialogWrapper: FC<DialogWrapperProps> = ({ path, children }) => {
  const router = useRouter();

  return (
    <Dialog open>
      <DialogContent showCloseBtn={false}>
        <Button
          className="absolute right-4 top-4 rounded-sm"
          size="icon"
          variant="ghost"
          onClick={() => router.back()}
        >
          <X />
          <span className="sr-only">Close</span>
        </Button>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
