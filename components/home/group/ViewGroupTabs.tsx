import { Tabs, TabsList } from "@/components/common-ui/shadcn-ui/tabs";
import {
  TabsContent,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";
import GroupsJoinedTab from "./GroupsJoinedTab";
import YourGroupsTab from "./YourGroupsTab";

const ViewGroupTabs = () => {
  return (
    <Tabs defaultValue="Groups Joined">
      <TabsList className="grid w-full grid-cols-2 bg-white text-black shadow">
        <TabsTrigger value="Groups Joined" >Groups Joined</TabsTrigger>
        <TabsTrigger value="Your Groups">Your Groups</TabsTrigger>
      </TabsList>
      <TabsContent value="Groups Joined">
        <GroupsJoinedTab />
      </TabsContent>
      <TabsContent value="Your Groups">
        <YourGroupsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ViewGroupTabs;
