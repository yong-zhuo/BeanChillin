"use client";

import { Button } from "@/components/common-ui/shadcn-ui/button";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import markAsRead from "@/lib/notifications/markAsRead";
import { formatTimeToNow } from "@/lib/utils";
import { DetailedNotif } from "@/types/notification";
import { Notification } from "@prisma/client";
import { Ban, Flag, MessageCirclePlus, MessageSquarePlus, MessageSquareReply, ShieldCheck, SquareX, User2, UserCheck, UserMinus, UserPlus, Users, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";

interface NotifPreviewProps {
  notification: DetailedNotif;
}
const NotifPreview = ({ notification }: NotifPreviewProps) => {
  let title = "";
  let description = "";
  let icon = null;
  let link = "";
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);
  const {toast} = useToast();
  const handleDelete = async () => {
    setIsDeleted(true);
    try {
      const res = await fetch(`/api/notifications?notifId=${notification.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete notification");
      }
      router.refresh();
    } catch (error) {
      setIsDeleted(false);
      toast({
        title: "Failed to delete notification",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  //notification logic
  switch (notification.type) {
    case "friendRequest":
      title = "Friend Request";
      description = " sent you a friend request";
      icon = <UserPlus className="h-12 w-12" />;
      link = `/profile/${notification.fromId}`;
      break;
    case "acceptFriendRequest":
      title = "New Friend";
      description = " accepted your friend request";
      icon = <UserCheck className="h-12 w-12" />;
      link = `/profile/${notification.fromId}`;
      break;
    case "joinedGroup":
      title = "New Group Member";
      description = ` has joined ${notification.group?.name}`;
      icon = <Users className="h-12 w-12" />;
      link = `/groups/${notification.group?.name}`;
      break;
    case "postComment":
      title = "New Comment";
      description = " commented on your post";
      icon = <MessageSquarePlus className="h-12 w-12" />;
      link = `/groups/${notification.group?.name}/post/${notification.postId}`;
      break;
    case "replyComment":
        title = "New Reply";
        description = " replied to your comment";
        icon = <MessageSquareReply className="h-12 w-12" />;
        link = `/groups/${notification.group?.name}/post/${notification.postId}`;
        break;
    case "removeGroupMember":
            title = "Removed from Group";
            description = ` removed you from ${notification.group?.name}`;
            icon = <UserMinus className="h-12 w-12" />;
            link = `/groups/${notification.group?.name}`;
            break;
    case "moderatorAdded":
            title = "New Moderator";
            description = ` added you as a moderator in ${notification.group?.name}`;
            icon = <ShieldCheck className="h-12 w-12" />;
            link = `/groups/${notification.group?.name}`;
            break;
    case "banned":
            title = "Banned from Group";
            description = ` banned you from ${notification.group?.name}`;
            icon = <Ban className="h-12 w-12" />;
            link = `/groups/${notification.group?.name}`;
            break;
    case "deletedPost":
            title = "Post Deleted";
            description = ` deleted your post in ${notification.group?.name}`;
            icon = <SquareX className="h-12 w-12" />;
            link = `/groups/${notification.group?.name}`;
            break;
    case "flaggedPost":
            title = "Post Flagged";
            description = ` has flagged a post in ${notification.group?.name} for inappropriate content`;
            icon = <Flag className="h-12 w-12" />;
            link = `/groups/${notification.group?.name}/post/${notification.postId}`;
            break;
  }

  return (
    <>
      {isDeleted ? null :
      <div className="relative flex items-center gap-4 rounded-md border bg-white p-4 shadow">
        <Button className="absolute right-0 top-0 w-fit hover:text-red-500" onClick={handleDelete}>
          <X className="h-4 w-4 " />
        </Button>
        {icon}
        <div className="">
          <div className="sm:text-md mb-2 text-lg font-bold">{title}</div>
          <div className="sm:text-md mb-2 text-sm" suppressHydrationWarning>
            {formatTimeToNow(new Date(notification.createdAt))}
          </div>
          <div className="sm:text-md text-sm">
            <Link
              href={`/profile/${notification.fromId}`}
              className="sm:text-md text-sm font-semibold hover:text-pri"
            >
              {notification.fromUser?.name}
            </Link>
            {description}
          </div>
        </div>
        {!notification.isRead ? <Button
          variant={"outline"}
          className="ml-auto mt-12 h-fit w-fit bg-pri text-white hover:bg-slate-400 hover:text-white"
          onClick={async () => {
            await markAsRead(notification);
            router.push(link);
            router.refresh();
          }}
        >
          View
        </Button> : <Button
          variant={"outline"}
          className="ml-auto mt-12 h-fit w-fit  "
          onClick={async () => {
            router.push(link);
            router.refresh();
          }}
         
        >
          Read
        </Button>}
      </div>}
    </>
  );
};

export default NotifPreview;
