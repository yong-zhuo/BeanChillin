import { Tabs, TabsList } from "@/components/common-ui/shadcn-ui/tabs";
import {
  TabsContent,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";
import GroupsJoinedTab from "./GroupsJoinedTab";
import YourGroupsTab from "./YourGroupsTab";
import { Group } from "@prisma/client";


interface ViewGroupsProps {
  joinedGroups: Group[];
  createdGroups: Group[];

}

const ViewGroupTabs = async ({joinedGroups, createdGroups}: ViewGroupsProps) => {
  //const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);

  //const [yourGroups, setYourGroups] = useState<Group[]>([]);

  //const { user } = useContext(UserContext);

  




  return (
    <Tabs defaultValue="Groups Joined">
      <TabsList className="grid w-full grid-cols-2 bg-white text-black shadow">
        <TabsTrigger value="Groups Joined">Groups Joined</TabsTrigger>
        <TabsTrigger value="Your Groups">Groups Created</TabsTrigger>
      </TabsList>
      <TabsContent value="Groups Joined">
        <GroupsJoinedTab groups={joinedGroups} />
      </TabsContent>
      <TabsContent value="Your Groups">
        <YourGroupsTab groups={createdGroups} />
      </TabsContent>
    </Tabs>
  );
};

export default ViewGroupTabs;
