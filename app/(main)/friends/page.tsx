import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";
import Image from "next/image";

const page = async () => {
  return (
    <div className="container mx-auto mt-3 w-5/6 px-12">
      <h2 className="text-3xl font-extrabold flex flex-row gap-2 items-cetner">
        Friends
        <Image src="/misc/friends.svg" alt="group" width={30} height={30} />
      </h2>
      <Tabs className="my-6" defaultValue="Your Friends">
        <TabsList className="text-semibold grid grid-cols-2 bg-white shadow">
          <TabsTrigger value="Your Friends">Your Friends</TabsTrigger>
          <TabsTrigger value="Friend Requests">Friend Requests</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default page;
