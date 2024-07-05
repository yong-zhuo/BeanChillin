"use client";

import { Button } from "@/components/common-ui/shadcn-ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";

const Notifications = ({ notifCount }: { notifCount: number }) => {
  return (
    <div className="relative flex aspect-square h-9 w-9 cursor-pointer items-center  justify-center overflow-hidden rounded-full border-2 border-pri bg-white p-0  px-4 py-2 text-sm font-medium shadow-md ring-pri transition hover:-translate-y-1 hover:ring-1 focus:outline-none focus:ring-0  md:h-12 md:w-12 md:hover:-translate-y-1 md:hover:ring-2">
      <Button asChild className="" variant={"default"}>
        <Link href={`/notifications`}>
          <Bell className="relative h-6 w-6 text-pri md:h-8 md:w-8" />
          {notifCount <= 0 ? null : <div className="absolute top-1 right-1 aspect-square rounded-full bg-red-400 text-white h-4 w-4 text-center text-xs">{notifCount}</div>}
        </Link>
      </Button>
      
    </div>
  );
};

export default Notifications;
