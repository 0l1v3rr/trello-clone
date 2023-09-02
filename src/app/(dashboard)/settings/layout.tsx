import { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";
import Header from "@/app/(dashboard)/settings/_components/header";

function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex max-w-[1000px] flex-col gap-6 p-8">
      <Header />
      <Separator />
      {children}
    </div>
  );
}

export default SettingsLayout;
