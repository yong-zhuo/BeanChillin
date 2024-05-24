import React from "react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/common-ui/shadcn-ui/avatar";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";

interface UserProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar = ({ user, ...props }: UserProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt="Profile Picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
