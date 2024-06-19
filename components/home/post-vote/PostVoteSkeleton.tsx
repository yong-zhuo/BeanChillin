import { buttonVariants } from "@/components/common-ui/shadcn-ui/button";
import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react";
import React from "react";

const PostVoteSkeleton = () => {
  return (
    <div className="flex flex-row sm:flex sm:flex-col w-12 justify-center items-center pl-6 ">
      <div className={buttonVariants({variant: 'ghost'})}>
        <ArrowBigUp className="h-5 w-5 text-zinc-700"/>
      </div>

      <div className="m-0 sm:mr-0 py-3 text-center text-sm font-medium text-zinc-900">
        <Loader2 className="animate-spin h-3 w-3"/>
      </div>

      <div className={buttonVariants({variant: 'ghost'})}>
        <ArrowBigDown className="h-5 w-5 text-zinc-700"/>
      </div>

    </div>
  );
};

export default PostVoteSkeleton;
