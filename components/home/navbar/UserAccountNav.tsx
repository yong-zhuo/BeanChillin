"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common-ui/shadcn-ui/dropdown-menu";
import { User } from "@prisma/client";
import React from "react";
import Link from "next/link";
import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

interface UserProps {
  user: Pick<User, "imageUrl" | "name" | "email">;
}

const UserAccountNav = ({ user }: UserProps) => {
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-12 w-12 border-2 border-pri rounded-full cursor-pointer focus:outline-none focus:ring-0"
          user={{ name: user.name || null, imageUrl: user.imageUrl || null }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-pri">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/" className="block p-2 cursor-pointer">
            Account settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            signOut( { callbackUrl: `${window.location.origin}/login` });
          }}
        >Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
