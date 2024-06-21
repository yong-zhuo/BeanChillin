import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import Image from "next/image";

interface ChatHeaderProps {
  name: string | null;
  imageUrl: string | null;
}

export default function ChatHeader({ params }: { params: ChatHeaderProps }) {
  const { name, imageUrl } = params;

  return (
    <div className="flex h-full max-h-[calc(100vh-6rem)] flex-1 flex-col justify-between ">
      <div className="flex justify-between rounded-t-md border-b-2 border-gray-200 bg-pri px-6 py-3 sm:items-center">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative h-8 w-8 sm:h-12 sm:w-12 items-center flex justify-center">
              <UserAvatar
                user={{ name: name || null, imageUrl: imageUrl || null }}
                className="rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="flex items-center text-xl">
              <span className="mr-3 font-semibold text-white">{name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
