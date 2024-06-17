import Button from "@/components/common-ui/button/Button";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import PostEditor from "@/components/home/post/PostEditor";
import prisma from "@/lib/prisma";
import { ArrowRightToLine, PlusIcon, SquarePen } from "lucide-react";
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
            <div className="text-zinc-500">
              Ready to share something new? Fill in your title and description
              below.
              <br />
              <br />
              <span className="">
               
                <span className="flex flex-row gap-2 items-center">
                  You can also add images or links by clicking on the
                  <PlusIcon className="h-5 w-5 bg-gray-100  text-gray-900 rounded-sm" />
                  icon when writing your description.
                </span>

               
              </span>
            </div>
          </div>
        </dl>
      </div>
      <Separator className="mb-2 bg-pri" />
      <PostEditor groupId={group.id} />
      <div className="-mt-5 mb-5 flex w-full justify-end">
        <Button
          action="submit"
          addClass="w-fit bg-pri text-white hover:bg-slate-500 transition hover:scale-105"
          formId="group-post"
        >
          Post <ArrowRightToLine />
        </Button>
      </div>
    </div>
  );
};

export default page;
