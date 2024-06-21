"use client";
import React from "react";
import GroupAvatar from "../group/GroupAvatar";
import { useRouter } from "next/navigation";
import { Group } from "@prisma/client";

interface GroupPreviewProps {
    group?: Group | null;
}

const SuggestedGroupPreview = ({group}:GroupPreviewProps) => {
    const router = useRouter();
  return (
    <div
      className="mb-6 cursor-pointer justify-center rounded-lg hover:bg-sec hover:shadow-md hover:transition-shadow  md:flex md:flex-row md:justify-between"
      onClick={() => router.push(`/groups/${group?.name}`)}
    >
      <div className="flex flex-col items-center p-1 md:flex-row">
        <GroupAvatar group img={group?.picture as string} className="aspect-square rounded-lg w-12 h-12 border-2 border-pri"/>
        <div className="flex flex-col">
          <div className="2xl:text-lg xl:text-md font-bold md:ml-2 md:text-sm 2xl:ml-4 ">
            {group?.name}
          </div>

          <p className="font-light md:ml-2 2xl:ml-4 md:text-xs xl:text-xs 2xl:text-sm truncate w-[15vh] 2xl:w-[24vh]">
            {group?.description || "No bio available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuggestedGroupPreview;
