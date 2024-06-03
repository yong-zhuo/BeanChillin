import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import GroupPreview from "./GroupPreview";

//TODO: To be mapped with data
const YourGroupsTab = () => {
  return (
    <ScrollArea className="h-[430px] md:h-[515px] lg:h-[515px] xl:h-[515px] 3mxl:h-[515px] 3xl:h-[635px] w-full overflow-auto rounded-md">
      <GroupPreview name="Kafka" members={10000} type="Interest" yourGroup />
      <GroupPreview name="bean chillin" members={120} type="Social" yourGroup />
      <GroupPreview name="kafka" members={230} type="CCA" yourGroup />
      <GroupPreview name="bean chillin" members={1230} type="Event" yourGroup />
      <GroupPreview
        name="Lorem ipsum"
        members={130}
        type="Academics"
        yourGroup
      />
      <GroupPreview
        name="Lorem Ippy"
        members={1320}
        type="Academics"
        yourGroup
      />
    </ScrollArea>
  );
};

export default YourGroupsTab;
