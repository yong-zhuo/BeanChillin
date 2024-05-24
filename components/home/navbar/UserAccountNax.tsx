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

interface UserProps {
  user: Pick<User, "image" | "name" | "email">;
}

const UserAccountNax = (user: UserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger></DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserAccountNax;
