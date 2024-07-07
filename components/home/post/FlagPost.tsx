"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/common-ui/shadcn-ui/alert-dialog";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import createNotifs from "@/lib/notifications/createNotif";
import { Group, User } from "@prisma/client";
import { Flag, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface FlagButtonProps {
  postId: string;
  isCurrUserMod: boolean;
  group: Group;
  userId: string;
}

const FlagPost = ({
  postId,
  isCurrUserMod,
  group,
  userId,
}: FlagButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const flagPost = async () => {
    try {
      if (isCurrUserMod) {
        return;
      }
      await Promise.all([
        createNotifs(
          { fromId: userId, groupId: group.id, postId: postId },
          "flaggedPostMod",
        ),
        createNotifs(
          { fromId: userId, groupId: group.id, postId: postId, toId: group.creatorId},
          "flaggedPostOwner",
        ),
      ]);
      toast({
        title: "Post flagged",
        description:
          "This post has been flagged for review by a moderator or the owner of the group.",
        variant: "event",
      });
      router.refresh();
    } catch (e) {
      toast({
        title: "Error flagging post",
        description: "An unexpected error occurred. Try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="px-1 py-0 sm:py-1">
      <AlertDialog>
        <AlertDialogTrigger className="flex flex-row items-center justify-center rounded-lg text-sm font-semibold text-red-400 hover:scale-105 hover:text-red-500 sm:hidden ">
          <Flag className="h-5 w-5 " />
        </AlertDialogTrigger>
        <AlertDialogTrigger className="hidden flex-row items-center justify-center rounded-lg text-sm font-semibold text-red-400 hover:bg-red-400 hover:text-white sm:flex">
          Flag Post
          <Flag className="h-5 w-5 " />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Flag Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This will flag the post for review by a moderator or the owner of
              the group.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-400 text-white transition hover:scale-105 hover:bg-gray-500 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => flagPost()}
              className="bg-red-400 text-white transition hover:scale-105 hover:bg-red-500"
            >
              Flag
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FlagPost;
