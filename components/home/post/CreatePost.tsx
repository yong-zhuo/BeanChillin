"use client";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import Button from "@/components/common-ui/button/Button";
import { ImageIcon, Link2 } from "lucide-react";
import { Input } from "@/components/common-ui/shadcn-ui/input";

const CreatePost = ({ session }: { session: Session | null }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-white shadow list-none mt-2">
      <div className="flex h-full justify-between gap-6 px-6 py-4">
        <div className="relative">
          <UserAvatar
            user={{
              name: user?.name || null,
              imageUrl: user?.imageUrl || null,
            }}
            className="h-10 w-10 border-2 border-pri"
          />

          
        </div>
        <Input onClick={() => router.push(pathname + '/submit-post')} readOnly placeholder="Click here to create a post" className="w-full focus-visible:ring-pri border-pri " />
        <Button
          handleClick={() => router.push(pathname + '/submit-post')}
          addClass="bg-transparent hover:bg-sec w-fit h-fit mt-0 mb-0 p-2 rounded-full"
        >
          <ImageIcon className="text-pri" />
        </Button>

        <Button
          handleClick={() => router.push(pathname + '/submit-post')}
          addClass="bg-transparent hover:bg-sec w-fit mt-0 mb-0 p-2 h-fit rounded-full"
        >
          <Link2 className="text-pri" />
        </Button>
      </div>
    </li>
  );
};

export default CreatePost;
