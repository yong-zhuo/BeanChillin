import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import GroupPreview from "./GroupPreview";

//TODO: To be mapped with data
const GroupsJoinedTab = () => {
  return (
    <ScrollArea className="3mxl:h-[515px] 3xl:h-[635px] h-[430px] w-full overflow-auto rounded-md  md:h-[515px] lg:h-[515px] xl:h-[515px]">
      <GroupPreview name="Kafka" members={10000} type="Interest" />
      <GroupPreview name="bean chillin" members={120} type="Social" />
      <GroupPreview name="kafka" members={230} type="CCA" />
      <GroupPreview name="bean chillin" members={1230} type="Event" />
      <GroupPreview name="Lorem ipsum" members={130} type="Academics" />
      <GroupPreview name="Lorem Ippy" members={1320} type="Academics" />
    </ScrollArea>
  );
};

export default GroupsJoinedTab;
