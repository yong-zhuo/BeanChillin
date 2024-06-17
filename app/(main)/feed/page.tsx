import React from "react";
import Image from "next/image";
import GeneralFeed from "@/components/home/feed/GeneralFeed";



const page = async () => {
  return (
    <div className="container mx-auto mt-3 w-5/6 px-12">
      <h2 className="text-3xl font-extrabold flex flex-row items-center gap-2 mb-3">
        Feed
        <Image src="/misc/feed.svg" alt="group" width={30} height={30} />
      </h2>
      <GeneralFeed />
    </div>
  );
};

export default page;
