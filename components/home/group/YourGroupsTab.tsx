import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import GroupPreview from "./GroupPreview";
import { Group } from "@prisma/client";


const YourGroupsTab = ({ groups }: { groups: Group[] }) => {
  return (
    
      <div>
        {groups.map((group) => (
          <GroupPreview group={group} key={group.id} />
        ))}
      </div>
    
  );
};

export default YourGroupsTab;
