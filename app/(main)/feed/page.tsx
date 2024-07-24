import React from "react";
import Image from "next/image";
import GeneralFeed from "@/components/home/feed/GeneralFeed";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";
import { ArrowBigUp, Clock, Flame, SquareCheck, SquareCheckBig, SquareUserRound, TrendingUp } from "lucide-react";
import MemberFeed from "@/components/home/feed/MemberFeed";
import TrendFeed from "@/components/home/feed/TrendFeed";
import PopularFeed from "@/components/home/feed/PopularFeed";
import HomeFeed from "@/components/home/feed/HomeFeed";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const page = async () => {
  return (
    <div className="sm:container mx-auto mt-3 w-full sm:w-5/6 sm:px-12">
      <h2 className="text-3xl font-extrabold flex flex-row items-center gap-2 mb-3 justify-center sm:justify-normal">
        Feed
        <Image src="/misc/feed.svg" alt="group" width={30} height={30} />
      </h2>
      <Tabs defaultValue="recent" className="mt-2 mb-2">
        <TabsList className="flex w-full items-center justify-start bg-white shadow overflow-x-auto ">
          <TabsTrigger value="for-you" className="flex gap-1">
            For You <SquareUserRound className="h-4 w-4 hidden xl:block" />
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex gap-1">
            Recent <Clock className="h-4 w-4 hidden xl:block" />
          </TabsTrigger>
          <TabsTrigger value="trend" className="flex gap-1">
            Trending <TrendingUp className="h-5 w-5 hidden xl:block" />
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex gap-1">
            Popular <Flame className="h-4 w-4 hidden xl:block" />
          </TabsTrigger>
          <TabsTrigger value="following" className="flex gap-1">
            Following <SquareCheckBig className="h-4 w-4 hidden xl:block" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="for-you">
          <HomeFeed />
        </TabsContent>
        <TabsContent value="recent">
          <GeneralFeed />
        </TabsContent>
        <TabsContent value="trend">
          <TrendFeed />
        </TabsContent>

        <TabsContent value="popular">
          <PopularFeed />
        </TabsContent>

        <TabsContent value="following">
          <MemberFeed />
        </TabsContent>
      </Tabs>

    </div>
  );
};

export default page;
