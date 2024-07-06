"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { INFINITE_SCROLL_RESULTS } from "@/config";
import { Notification } from "@prisma/client";
import {
  Grid2x2Check,
  Loader2,
  
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import NotifPreview from "./NotificationPrev";
import { DetailedNotif } from "@/types/notification";


interface NotifFeedProps {
  initNotifications: DetailedNotif[];
  filter?: 'posts' | 'groups' | 'friends';
}

const NotifFeed = ({ initNotifications,filter }: NotifFeedProps) => {
  const [offset, setOffset] = useState(INFINITE_SCROLL_RESULTS);
  const [notifs, setNotifs] = useState<DetailedNotif[]>(initNotifications);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [scrollTrigger, isInView] = useInView({
    threshold: 1,
  });
  const { toast } = useToast();

  const loadMoreNotifs = async () => {
    try {
      if (hasMoreData) {
        const query =
          `/api/notifications?limit=${INFINITE_SCROLL_RESULTS}&offset=${offset}` + (!!filter ? `&filter=${filter}` : "");
        const res = await fetch(query, {
          method: "GET",
        });
        const newNotifs = (await res.json()) as DetailedNotif[];

        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }
        
        if (newNotifs.length === 0) {
          setHasMoreData(false);
        }

        setNotifs((prevNotifs) => [...prevNotifs, ...newNotifs]);
        setOffset((prevOffset) => prevOffset + INFINITE_SCROLL_RESULTS);
      }
    } catch (error) {
  
      toast({
        title: "Failed to fetch notifications",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isInView && hasMoreData) {
      loadMoreNotifs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, hasMoreData]);

  return (
    <ul className="flex flex-col gap-6  ">
      
      {notifs.map((notif, index) => {
        if (index === notifs.length - 1) {
          return (
            <li ref={scrollTrigger} key={notif.id} className="list-none">
              <NotifPreview notification={notif} />
            </li>
          );
        } else {
          return <NotifPreview key={notif.id} notification={notif} />;
        }
      })}

      {notifs.length === 0 && (
        <div className="flex items-center gap-4 rounded-md border bg-white p-4 shadow">
          <div>
            <div className="mb-2 font-bold">No notifications</div>
            <div className="mb-2">You have no new notifications.</div>
          </div>
        </div>
      )}

      {hasMoreData && (
        <li className="flex justify-center" ref={scrollTrigger}>
          Loading
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </li>
      )}
    </ul>
  );
};

export default NotifFeed;
