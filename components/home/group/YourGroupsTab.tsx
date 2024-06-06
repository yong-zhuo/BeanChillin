import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import GroupPreview from "./GroupPreview";

//TODO: To be mapped with data
const YourGroupsTab = () => {
  return (
    <ScrollArea className="h-[430px] md:h-[515px] lg:h-[515px] xl:h-[515px] 3mxl:h-[515px] 3xl:h-[635px] w-full overflow-auto rounded-md">
      <GroupPreview name="Placeholder1" members={10000} type="Interests" />
      <GroupPreview name="Placeholder2" members={120} type="Social" />
      <GroupPreview name="Placeholder3" members={230} type="CCA" />
    </ScrollArea>
  );
};

export default YourGroupsTab;
