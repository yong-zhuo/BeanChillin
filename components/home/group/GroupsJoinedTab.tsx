
import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import GroupPreview from "./GroupPreview";
import { Group } from "@prisma/client";


const GroupsJoinedTab = ({ groups }: { groups: Group[] }) => {


  
  return (
    <div className="">
      {groups.map((group) => (
        <GroupPreview group={group} key={group.id} />
      ))}
    </div>
  );
};

export default GroupsJoinedTab;
