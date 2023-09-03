import { Metadata } from "next";
import NewForm from "@/app/(dashboard)/new/_components/new-form";

export const metadata: Metadata = {
  title: "New Board",
};

const NewPage = () => {
  return (
    <main className="mx-auto flex max-w-[600px] flex-col gap-4 p-8">
      <h1 className="text-xl font-semibold">Create new board</h1>
      <NewForm />
    </main>
  );
};

export default NewPage;
