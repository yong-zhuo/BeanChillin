import React from "react";
import { Badge } from "@/components/common-ui/shadcn-ui/badge";
import { GroupType } from "@/types/groupType";


const GroupBadge = ({ type }: { type: GroupType }) => {
  const groupColours = {
    Academics: "bg-blue-400",
    Interests: "bg-green-400",
    Social: "bg-yellow-400",
    Events: "bg-red-400",
    CCA: "bg-purple-400",
  };

  const groupColor =
    type !== undefined ? groupColours[type] : "bg-gray-400";

  return (
    <Badge className={`ml-2 ${groupColor} h-1/6 font-medium md:h-1/4`}>
      {type}
    </Badge>
  );
};

export default GroupBadge;
