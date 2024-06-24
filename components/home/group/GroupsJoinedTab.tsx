
import GroupPreview from "./GroupPreview";
import { Group } from "@prisma/client";


const GroupsJoinedTab = async ({ groups }: { groups: Group[] }) => {


  
  return (
    <div className="">
      {groups.map((group) => (
        <GroupPreview group={group} key={group.id} />
      ))}
    </div>
  );
};

export default GroupsJoinedTab;
