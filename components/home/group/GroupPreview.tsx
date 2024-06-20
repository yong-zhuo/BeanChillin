"use client";
import { Card, CardHeader } from "@/components/common-ui/shadcn-ui/card";
import GroupAvatar from "./GroupAvatar";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import GroupBadge from "./GroupBadge";
import { GroupType } from "@/types/groupType";
import { Group } from "@prisma/client";
import { getMemberCount } from "@/lib/group/groupActions";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowBigRight, Loader2 } from "lucide-react";

const GroupPreview = ({ group }: { group: Group }) => {
  const [memberCount, setMemberCount] = useState<number | null>(null);


  useEffect(() => {
    const fetchMemberCount = async () => {
      const count = await getMemberCount(group.id);
      setMemberCount(count);
    };
    fetchMemberCount();
  }, [group]);

  return (
    <>
      <Card className="mb-3 mt-3">
        <CardHeader>
          <div className="justify-center lg:flex lg:flex-row lg:justify-between">
            <div className="flex items-center">
              <GroupAvatar
                group={true}
                img={group.picture || "/placeholder/pl3.png"}
                className="h-16 w-16 rounded-md border-2 border-pri xl:h-20 xl:w-20"
              />
              <div className="flex w-2/3 flex-col items-center lg:items-start xl:w-4/5">
                <div className="ml-4 flex flex-col items-center justify-between font-bold lg:flex-row xl:text-2xl">
                  {group.name}
                  <GroupBadge type={group.type as GroupType} />
                </div>
                <div className="ml-4 text-sm font-light flex flex-row items-center gap-1">
                  Members: {memberCount === null? <Loader2 className="h-4 w-4 animate-spin"/> : memberCount}
                </div>
              </div>
            </div>
            <div className="flex h-1/4 w-full flex-row space-x-12 lg:h-fit lg:w-fit lg:space-x-5 justify-center items-center lg:items-stretch lg:justify-end">
              <Button
                asChild
                className="group relative mt-9 flex items-center justify-center border border-transparent bg-pri  px-4 py-2 text-sm font-medium text-white transition hover:scale-105 hover:bg-slate-400 hover:shadow-lg"
              >
                <Link href={`/groups/${group.name}`}>
                  View
                  <ArrowBigRight />
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      
    </>
  );
};

export default GroupPreview;
