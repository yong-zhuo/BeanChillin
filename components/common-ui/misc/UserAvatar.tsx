import React from "react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/common-ui/shadcn-ui/avatar";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "@prisma/client";

interface UserProps extends AvatarProps {
  user: Pick<User, "name" | "imageUrl">;
}

const UserAvatar = ({ user, ...props }: UserProps) => {
  return (
    <Avatar {...props}>
      {user.imageUrl ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            src={user.imageUrl}
            alt="Profile Picture"
            referrerPolicy="no-referrer"
            fill
            priority={true}
          />
        </div>
      ) : (
        <AvatarFallback>
          <Image
            src="/profile/avatar.svg"
            alt="Profile Picture"
            referrerPolicy="no-referrer"
            fill
          />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
