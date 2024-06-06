import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import GroupAvatar from "./GroupAvatar";
import { AspectRatio } from "@/components/common-ui/shadcn-ui/aspect-ratio";
import Image from "next/image";
import Button from "@/components/common-ui/button/Button";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabline";
import CreatePost from "../post/CreatePost";
import { Session } from "next-auth";
import AboutGroupTab from "./AboutGroupTab";
import GroupBadge from "./GroupBadge";
import { LogOut, Trash } from "lucide-react";
//TODO:Create tabs list for group page
const GroupHeader = ({
  name,
  joined,
  session,
}: {
  name: string;
  joined: boolean;
  session: Session | null;
}) => {
  return (
    <div>
      <Card className="relative rounded-b-none  border-b-2 border-b-pri">
        <div className="mx-auto mt-6 w-11/12">
          <AspectRatio ratio={3 / 1}>
            <Image
              src="/placeholder/pl2.jpg"
              alt="Banner"
              fill
              className="rounded-md border-2 border-pri object-cover"
            />
          </AspectRatio>
          <GroupAvatar
            group
            img="/placeholder/pl3.png"
            className="absolute bottom-0 aspect-square h-14 w-14 -translate-y-20 translate-x-1/3 transform rounded-lg border-2 border-pri lg:h-20 lg:w-20 lg:-translate-y-3/4 lg:translate-x-1/3"
          />
        </div>
        <CardContent className="-ml-1 flex items-center justify-between pt-8 md:ml-4">
          <h1 className="text-2xl font-semibold">
            {name} <GroupBadge type={"Interests"} />
          </h1>
          {joined ? (
            <Button
              addClass="bg-red-400 text-white w-1/3 text-sm md:w-fit mt-0 mr-0 md:mr-3 hover:bg-slate-400 transition hover:-translate-y-1 hover:-translate-x-1 shadow-md"
              text="Leave Group"
              action="submit"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              addClass="bg-pri text-white w-1/3 text-sm md:w-fit mr-0 mx-2 md:mr-3 hover:bg-slate-400 transition hover:-translate-y-1 hover:-translate-x-1 shadow-md"
              text="Join Group"
              action="submit"
            >
              <Trash className="h-5 w-5" />
            </Button>
          )}
        </CardContent>
      </Card>
      <Tabs className="-mt-[2px]" defaultValue="Posts">
        <TabsList className="grid w-full grid-cols-5 -space-x-1.5 rounded-b-lg rounded-t-none border bg-white text-center text-black shadow-sm">
          <TabsTrigger value="About" className="text-center hover:bg-gray-100">
            About
          </TabsTrigger>
          <TabsTrigger value="Posts" className="text-center hover:bg-gray-100">
            Posts
          </TabsTrigger>
          
        </TabsList>

        <TabsContent value="About">
          <AboutGroupTab
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac libero eu eros blandit luctus. Donec vehicula condimentum condimentum. Curabitur quis pulvinar urna."
            creator="BeanChillin"
          />
        </TabsContent>
        <TabsContent value="Posts">
          <CreatePost session={session} />
        </TabsContent>
        
      </Tabs>
    </div>
  );
};

export default GroupHeader;
