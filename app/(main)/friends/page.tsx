import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";

const page = async () => {
  return (
    <div className="container mx-auto mt-3 w-5/6 px-12">
      <h2 className="text-3xl font-extrabold">Friends</h2>
      <Tabs className="my-6" defaultValue="Your Friends">
        <TabsList className="grid grid-cols-2 bg-white text-semibold shadow" >
          <TabsTrigger value="Your Friends" >Your Friends</TabsTrigger>
          <TabsTrigger value="Friend Requests" >Friend Requests</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default page;
