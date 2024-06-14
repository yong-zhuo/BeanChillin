
import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import GroupPreview from "./GroupPreview";
import { Group } from "@prisma/client";


const GroupsJoinedTab = ({ groups }: { groups: Group[] }) => {


  
  return (
    <ScrollArea className="h-[430px] w-full overflow-auto rounded-md md:h-[515px] lg:h-[515px]  xl:h-[515px] 3mxl:h-[515px] 3xl:h-[635px]">
      {groups.map((group) => (
        <GroupPreview group={group} key={group.id} />
      ))}
    </ScrollArea>
  );
};

export default GroupsJoinedTab;
