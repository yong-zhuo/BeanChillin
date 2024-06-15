"use client";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Messaging = () => {
  const router = useRouter();
  return (
    <div className=" flex aspect-square h-9 w-9 cursor-pointer items-center  justify-center overflow-hidden rounded-full border-2 border-pri bg-white p-0  px-4 py-2 text-sm font-medium shadow-md ring-pri transition hover:-translate-y-1 hover:ring-1 focus:outline-none focus:ring-0  md:h-12 md:w-12 md:hover:-translate-y-1 md:hover:ring-2">
      <Button asChild className="" variant={"default"}>
        <Link href={"/chat"}>
          <MessageCircle className="h-6 w-6 text-pri md:h-8 md:w-8" />
        </Link>
      </Button>
    </div>
  );
};

export default Messaging;
