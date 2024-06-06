import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import GroupPreview from "./GroupPreview";

//TODO: To be mapped with data
const GroupsJoinedTab = () => {
  return (
    <ScrollArea className="3mxl:h-[515px] 3xl:h-[635px] h-[430px] w-full overflow-auto rounded-md  md:h-[515px] lg:h-[515px] xl:h-[515px]">
      <GroupPreview name="Placeholder1" members={10000} type="Interests" />
      <GroupPreview name="Placeholder2" members={120} type="Social" />
      <GroupPreview name="Placeholder3" members={230} type="CCA" />
      <GroupPreview name="Placeholder4" members={1230} type="Events" />
      <GroupPreview name="Placeholder5" members={130} type="Academics" />
      <GroupPreview name="Placeholder6" members={1320} type="Academics" />
    </ScrollArea>
  );
};

export default GroupsJoinedTab;
