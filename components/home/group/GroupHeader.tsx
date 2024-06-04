import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import GroupAvatar from "./GroupAvatar";
import { AspectRatio } from "@/components/common-ui/shadcn-ui/aspect-ratio";
import Image from "next/image";
import Button from "@/components/common-ui/button/Button";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabline";
import CreatePost from "../post/CreatePost";
import { Session } from "next-auth";
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
              src="/placeholder/pl2.png"
              alt="Banner"
              fill
              className="rounded-md border-2 border-pri object-cover"
            />
          </AspectRatio>
          <GroupAvatar
            group
            img="/placeholder/pl1.jpg"
            className="absolute bottom-0 aspect-square h-20 w-20 -translate-y-3/4 translate-x-1/3 transform rounded-lg border-2 border-pri"
          />
        </div>
        <CardContent className="-ml-1 md:ml-4 flex items-center justify-between pt-8">
          <h1 className="mt-2 text-2xl font-semibold">{name}</h1>
          {joined ? (
            <Button
              addClass="bg-red-400 text-white w-fit mt-0 mr-0 md:mr-3 hover:bg-slate-400 transition hover:-translate-y-1 hover:-translate-x-1 shadow-md"
              text="Leave Group"
              action="submit"
            />
          ) : (
            <Button
              addClass="bg-pri text-white w-fit mr-0 mx-2 md:mr-3 hover:bg-slate-400 transition hover:-translate-y-1 hover:-translate-x-1 shadow-md"
              text="Join Group"
              action="submit"
            />
          )}
        </CardContent>
      </Card>
      <Tabs className="-mt-[2px] ">
        <TabsList className="grid w-full grid-cols-6 rounded-t-none border bg-white text-center text-black shadow-sm -space-x-1.5">
          <TabsTrigger value="About" className="text-center hover:bg-gray-100">
            About
          </TabsTrigger>
          <TabsTrigger value="Posts" className="text-center hover:bg-gray-100">
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="Members"
            className="text-center hover:bg-gray-100"
          >
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="About">About</TabsContent>
        <TabsContent value="Posts">
          <CreatePost session={session} />
        </TabsContent>
        <TabsContent value="Members">Members</TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupHeader;
