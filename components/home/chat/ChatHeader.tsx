"use client"
import { Button } from "@/components/common-ui/shadcn-ui/button";
import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface ChatHeaderProps {
  name: string | null;
  imageUrl: string | null;
}

export default function ChatHeader({ params }: { params: ChatHeaderProps }) {
  const { name, imageUrl } = params;
  const router = useRouter();
  return (
    <div className="flex h-full max-h-[calc(100vh-6rem)] flex-1 flex-col justify-between">
      <div className="flex sm:justify-start items-center space-x-4 rounded-t-md border-b-2 border-gray-200 bg-pri px-6 py-3 justify-between">
        <div className="relative items-center justify-center">
          <Button
            onClick={() => router.push("/chat/chat")}
            className="text-white w-fit px-0 sm:hidden"
          ><ArrowLeft /> Back</Button>
        </div>
        <div className="relative order-last sm:order-2">
          <div className="relative h-8 w-8 sm:h-12 sm:w-12 items-center flex">
            <UserAvatar
              user={{ name: name || null, imageUrl: imageUrl || null }}
              className="rounded-full"
            />
          </div>
        </div>

        <div className="flex flex-col leading-tight sm:order-3">
          <div className="flex items-center text-xl">
            <span className="sm:mr-3 font-semibold text-white text-nowrap truncate w-[150px] md:w-[250px] lg:w-[350px] text-center sm:text-start">{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
