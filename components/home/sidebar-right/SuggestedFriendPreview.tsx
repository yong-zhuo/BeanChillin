'use client'

import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type UserPreviewProps = {
  otherUser?: User | null;
};


const SuggestedFriendPreview = (props: UserPreviewProps) => {

    const router = useRouter();

  return (
    <div className="mb-6 justify-center md:flex md:flex-row md:justify-between rounded-lg hover:bg-sec  hover:transition-shadow hover:shadow-md cursor-pointer" onClick={(e) => router.push(`/profile/${props.otherUser?.id}`) }>
      <div className="flex flex-col items-center md:flex-row p-1">
        <UserAvatar
          user={{
            name: props.otherUser?.name || null,
            imageUrl: props.otherUser?.imageUrl || null,
          }}
          className="aspect-square h-12 w-12 rounded-full border-2 border-pri xl:h-12 xl:w-12"
        />
        <div className="flex flex-col gap-2">
          <div className="2xl:text-lg xl:text-md font-bold md:ml-2 md:text-sm 2xl:ml-4">
            {props.otherUser?.name}
          </div>

          <p className="font-light md:ml-2 2xl:ml-4 md:text-xs xl:text-xs 2xl:text-sm truncate w-[15vh] 2xl:w-[24vh]">
            {props.otherUser?.bio || "No bio available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuggestedFriendPreview;
