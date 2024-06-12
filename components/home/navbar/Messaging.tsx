"use client"
import Button from "@/components/common-ui/button/Button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Messaging = () => {

  const router = useRouter();
  return (
    <div>
      <Button
        isCircular
        action="button"
        orientation="left"
        handleClick={() => router.push("/chat")}
        addClass="h-8 w-8 md:h-12 md:w-12 border-2 border-pri cursor-pointer focus:outline-none focus:ring-0 hover:ring-1 md:hover:ring-2 ring-pri m-0 p-0 transition translate-y-0 hover:-translate-y-1  md:hover:-translate-y-1 flex items-center justify-center shadow-md bg-white"
      >
        <MessageCircle className="text-pri h-6 w-6 md:h-9 md:w-9" />
      </Button>
    </div>
  );
};

export default Messaging;
