'use client'
import { Card, CardHeader } from "@/components/common-ui/shadcn-ui/card";
import GroupAvatar from "./GroupAvatar";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import Button from "@/components/common-ui/button/Button";
import GroupBadge from "./GroupBadge";
import { GroupType } from "@/types/groupType";
import { useRouter } from "next/navigation";
import { Group } from "@prisma/client";
import { getMemberCount } from "@/lib/group/groupActions";
import { useEffect, useRef, useState } from "react";



const GroupPreview = ({group}: {group: Group}) => {
  
  const [memberCount, setMemberCount] = useState<number | null>(null);
 
  
  const router = useRouter();
  useEffect(() => {
    
    const fetchMemberCount = async () => {
      const count = await getMemberCount(group.id);
      setMemberCount(count);
      
    }
    fetchMemberCount();
  }, [group]);

  return (
    <>
      <Card className="mb-3 mt-3">
        <CardHeader>
          <div className="justify-center xl:flex xl:flex-row xl:justify-between">
            <div className="flex items-center">
              <GroupAvatar
                group={true}
                img={group.picture || "/placeholder/pl3.png"}
                className="rounded-md border-2 border-pri h-16 w-16 xl:h-20 xl:w-20"
              />
              <div className="flex w-2/3 flex-col xl:w-4/5 items-center lg:items-start">
                <div className="ml-4 font-bold xl:text-2xl flex flex-col lg:flex-row justify-between items-center">
                  {group.name}
                  <GroupBadge type={group.type as GroupType}/>
                </div>
                <div className="ml-4 text-sm font-light">
                  Members: {memberCount}
                </div>
              </div>
            </div>
            <div className="flex h-1/4 w-full flex-row space-x-12 xl:h-fit xl:w-fit xl:space-x-5  ">
              <Button
                text="View"
                action="button"
                addClass="bg-pri text-white hover:bg-slate-400 items-center hover:shadow-lg hover:scale-105 transition"
                handleClick={() => {router.push(`/groups/${group.name}`)}}
              /> 
            </div>
          </div>
        </CardHeader>
      </Card>
      <Separator className="bg-pri" />
    </>
  );
};

export default GroupPreview;
