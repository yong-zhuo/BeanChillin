import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common-ui/shadcn-ui/dropdown-menu";
import { User } from "next-auth";
import React from "react";
import Link from "next/link";
import UserAvatar from "@/components/common-ui/misc/UserAvatar";

interface UserProps {
  user: Pick<User, "image" | "name" | "email">;
}

const UserAccountNav = ({ user }: UserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-10 w-10"
          user={{ name: user.name || null, image: user.image || null }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-sec" align="end">

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
