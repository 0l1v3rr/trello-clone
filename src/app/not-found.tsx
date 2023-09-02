import Image from "next/image";
import Link from "next/link";
import notFoundImage from "@/assets/404.svg";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Image className="" src={notFoundImage} alt="Not Found" />
      <Button variant="secondary" asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
