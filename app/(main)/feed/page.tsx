import React from "react";
import Image from "next/image";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container mx-auto mt-3 w-5/6 px-12">
      <h2 className="text-3xl font-extrabold flex flex-row items-center gap-2">
        Feed
        <Image src="/misc/feed.svg" alt="group" width={30} height={30} />
      </h2>
    </div>
  );
};

export default page;
