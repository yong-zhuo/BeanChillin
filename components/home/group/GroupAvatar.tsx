import React from "react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/common-ui/shadcn-ui/avatar";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";

//to be replaced with actual group data
interface GroupProps extends AvatarProps {
    group?: boolean
    img: string
}

const GroupAvatar = ({group,img, ...props }: GroupProps) => {
  return (
    <Avatar {...props}>
      {img ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            src={img}
            alt="Group Picture"
            referrerPolicy="no-referrer"
            fill
          />
        </div>
      ) : (
        <AvatarFallback>
          <Image
            src="/profile/avatar.svg"
            alt="Group Picture"
            referrerPolicy="no-referrer"
            fill
          />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default GroupAvatar;