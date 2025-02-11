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
import { Group } from "@prisma/client";
import { Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface DeleteButtonProps {
  postId: string;
  isCurrUserMod: boolean;
  authorId: string;
  group: Group;
  userId: string;
}

const DeleteButton = ({ postId, isCurrUserMod, authorId, group, userId }: DeleteButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();


  const deletePost = async () => {

    const res = await fetch(`/api/group/posts/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: postId }),
    });

    if (!res.ok) {
      if (res.status === 409) {
        toast({
          title: "Error deleting post",
          description: "Post does not exist",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error deleting post",
          description: "An unexpected error occurred. Try again later.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Post deleted",
        description: "Post has been deleted",
        variant: "event",
      });
      const newPath = pathname.split("/").slice(0, -2).join("/");
      router.replace(newPath)
      router.refresh()
      if ((isCurrUserMod || userId === group.creatorId) && (userId !== authorId)) {
        await createNotifs({ fromId: userId, toId: authorId, postId: postId, type: "deletedPost", groupId: group.id }, "deletedPost")
      }

    }
  };
  return (
    <div className="px-1 py-0 sm:py-1">
      <AlertDialog>
        <AlertDialogTrigger className="sm:hidden font-semibold text-red-400 text-xs flex flex-row items-center justify-center rounded-lg hover:scale-105 hover:text-red-500">
          <Trash className="h-5 w-5 " />
        </AlertDialogTrigger>
        <AlertDialogTrigger className="hidden font-semibold text-red-400 text-sm sm:flex flex-row items-center justify-center rounded-lg hover:bg-red-400 hover:text-white">
          Delete Post<Trash className="h-5 w-5 " />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
            <AlertDialogDescription>
              Your post will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-400 text-white hover:scale-105 transition hover:bg-gray-500 hover:text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deletePost()} className="text-white bg-red-400 hover:bg-red-500 hover:scale-105 transition">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteButton;
