import Button from "@/components/common-ui/button/Button";
import { Card } from "@/components/common-ui/shadcn-ui/card";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import PostEditor from "@/components/home/post/PostEditor";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { SquarePen } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Create Post | BeanChillin",
  description: "Welcome to BeanChillin!",
};

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  //Logic to check if group exists
  const group = await prisma.group.findFirst({
    where: {
      name: params.slug,
    },
  });
  if (!group) return notFound();
  return (
    <div className="flex flex-col items-start gap-6">
      <div className="">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-3xl font-extrabold  text-gray-900">
            Create Post 
          </h3>
          <p className="text-md ml-2 mt-1 truncate text-gray-500 ">
            in {params.slug}
          </p>
        </div>
      </div>
      <div className="my-0 h-fit w-full rounded-lg ">
        <div className="rounded-lg bg-pri px-6 py-1 shadow-md">
          <p className="flex items-center gap-1.5 py-3 font-semibold text-sec">
            <SquarePen className="" />
            Create a new Post
          </p>
        </div>
        <dl className="text-md -my-2 divide-y divide-pri bg-white px-6 py-2 leading-6">
          <div className="flex justify-between gap-x-4 py-3 ">
            <p className="text-zinc-500">
              Ready to share something new? Fill in your title and description
              below. You can also add images or links to make your post more
              engaging.
            </p>
          </div>
        </dl>
      </div>
      <Separator className="mb-2 bg-pri" />
      <PostEditor groupId={group.id} />
      <div className="flex w-full justify-end">
        <Button action="submit" addClass="w-full">
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
