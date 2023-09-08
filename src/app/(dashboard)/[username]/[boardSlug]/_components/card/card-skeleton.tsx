import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 rounded-md border p-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-4 w-[30px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

export default CardSkeleton;
