"use client";

import Button from "@/components/common-ui/button/Button";
import { Loader, LogOut, Plus, Trash } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Group, User } from "@prisma/client";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { useRouter } from "next/navigation";
//TODO:Create tabs list for group page
const MembershipButton = ({
  status,
  group,
}: {
  status: boolean;
  group: Group;
}) => {
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const isCreator = user?.id === group.creatorId;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //handle click for deleting group
  const deleteGroup = async () => {
    setLoading(true);
    const response = await fetch("/api/group/delete", {
      method: "POST",
      body: JSON.stringify({ groupId: group.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      setLoading(false);
      if (response.status === 401) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "Please login to delete a Group.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else if (response.status === 500) {
        toast({
          variant: "destructive",
          title: "Failed to delete Group",
          description: "Please refresh the page and try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else if (response.status === 409) {
        toast({
          variant: "destructive",
          title: "Group does not exists",
          description: "Please refresh the page and try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please refresh the page and try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } else {
      toast({
        variant: "success",
        title: "Group deleted",
        description: "Group has been deleted successfully",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      router.push("/groups");
    }
  };

  //handle click for joining group
  const joinGroup = async () => {
    setLoading(true);
    const response = await fetch("/api/group/join", {
      method: "POST",
      body: JSON.stringify({ userId: user?.id , groupId: group.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setLoading(false);
      if (response.status === 401) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "Please login to join a Group.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else if (response.status === 500) {
        toast({
          variant: "destructive",
          title: "Failed to join Group",
          description: "Please refresh the page and try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else if (response.status === 400) {
        toast({
          variant: "destructive",
          title: "You are already a member of this group",
          description: "Please refresh the page.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please refresh the page and try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } else {
      setLoading(false);
      toast({
        variant: "success",
        title: "Group joined",
        description: "You have joined the group successfully",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      router.refresh()
    }
  };

  //handle click for leaving group
  const leaveGroup = async () => {
    setLoading(true);
    const response = await fetch("/api/group/leave", {
      method: "POST",
      body: JSON.stringify({ userId: user?.id, groupId: group.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setLoading(false);
      if (response.status === 401) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "Please login to leave a Group.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else if (response.status === 500) {
        toast({
          variant: "destructive",
          title: "Failed to leave Group",
          description: "Please refresh the page and try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else if (response.status === 400) {
        toast({
          variant: "destructive",
          title: "You are not a member of this group",
          description: "Please refresh the page.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please refresh the page and try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } else {
      setLoading(false);
      toast({
        variant: "success",
        title: "Group left",
        description: "You have left the group successfully",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      router.refresh()
    }
  };




  return (
    <>
    
      {isCreator ? (
        <Button
          addClass="bg-red-400 text-white w-1/3 text-sm md:w-fit mt-0 mr-0 md:mr-3 hover:bg-slate-400 transition hover:-translate-y-1 hover:-translate-x-1 shadow-md"
          text="Delete Group"
          action="submit"
          handleClick={deleteGroup}
          state={loading}
          width={20}
          height={20}
          loadText="Deleting"
        >
          <Trash className="h-5 w-5" />
        </Button>
      ) : status ? (
        <Button
          addClass="bg-red-400 text-white w-1/3 text-sm md:w-fit mt-0 mr-0 md:mr-3 hover:bg-slate-400 transition hover:-translate-y-1 hover:-translate-x-1 shadow-md"
          text="Leave Group"
          action="submit"
          handleClick={leaveGroup}
          state={loading}
          width={20}
          height={20}
          loadText="Leaving"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          addClass="bg-pri text-white w-1/3 text-sm md:w-fit mr-0 mt-0 md:mr-3 hover:bg-slate-400 transition hover:-translate-y-1 hover:-translate-x-1 shadow-md"
          text="Join Group"
          action="submit"
          handleClick={joinGroup}
          state={loading}
          width={20}
          height={20}
          loadText="Joining"
        >
          <Plus className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default MembershipButton;
