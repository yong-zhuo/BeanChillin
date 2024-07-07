"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common-ui/shadcn-ui/dialog";
import { Ban, Loader2, Settings, ShieldBan, ShieldCheck, UserX } from "lucide-react";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { Group, User } from "@prisma/client";
import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import {
  toast,
  useToast,
} from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { useRouter } from "next/navigation";
import createNotifs from "@/lib/notifications/createNotif";
import { banUser, makeModerator, removeModerator } from "@/lib/group/groupActions";
interface ManageMemberButtonProps {
  member: User | null;
  group: Group | null;
  currUser: User | null;
  isModerator?: boolean;
  isCurrUserMod?: boolean;
}

const ManageMemberButton = ({
  member,
  group,
  currUser,
  isModerator,
  isCurrUserMod,
}: ManageMemberButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/group/leave", {
        method: "POST",
        body: JSON.stringify({ userId: member?.id, groupId: group?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Could not remove member from group");
      } else {
        setIsLoading(false);
        toast({
          variant: "event",
          title: "Member removed",
          description: `You have removed ${member?.name} successfully`,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        router.refresh();
        await createNotifs(
          {
            fromId: currUser?.id as string,
            toId: member?.id as string,
            groupId: group?.id as string,
            type: "removeGroupMember",
          },
          "removeGroupMember",
        );
      }
    } catch (e) {
      setIsLoading(false);
      toast({
        title: "Error removing group member",
        description: "Could not remove member from group",
        variant: "destructive",
      });
    }
  };

  const handleBan = async () => {
    setIsLoading(true);
    try {
      await banUser(group?.id as string, member?.id as string);

      await createNotifs(
        {
          fromId: currUser?.id as string,
          toId: member?.id as string,
          groupId: group?.id as string,
          type: "banned",
        },
        "banned",
      );

      toast({
        variant: "event",
        title: "Member banned",
        description: `You have banned ${member?.name} successfully`,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } catch (e) {
      setIsLoading(false);
      toast({
        title: "Error banning group member",
        description: "Could not ban member from group",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      
      router.refresh();
    }
  };

  const handleMod = async () => {
    setIsLoading(true);
    try {
      await makeModerator(group?.id as string, member?.id as string);

      await createNotifs(
        {
          fromId: currUser?.id as string,
          toId: member?.id as string,
          groupId: group?.id as string,
          type: "moderatorAdded",
        },
        "moderatorAdded",
      );

      toast({
        variant: "success",
        title: "Member modded",
        description: `You have modded ${member?.name} successfully`,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } catch (e) {
      setIsLoading(false);
      toast({
        title: "Error banning group member",
        description: "Could not ban member from group",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      
      router.refresh();
    }
  };

  const handleUnMod = async () => {
    setIsLoading(true);
    try {
      await removeModerator(group?.id as string, member?.id as string);
      toast({
        variant: "success",
        title: "Member unmodded",
        description: `You have unmodded ${member?.name} successfully`,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } catch (e) {
      setIsLoading(false);
      toast({
        title: "Error unmodding group member",
        description: "Could not unmod member",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
     
      router.refresh();
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex w-fit flex-row items-center justify-center gap-1 text-wrap bg-gray-400 text-white shadow transition hover:scale-105 hover:bg-gray-600 sm:text-nowrap">
            Manage Member
            <Settings className="h-8 w-8 sm:h-5 sm:w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent
          className="max-h-[90vh] w-[40vh] overflow-y-auto sm:w-[800px] sm:max-w-[51vh] "
          onInteractOutside={(e) => {
            if (isLoading) e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Manage Member</DialogTitle>
            <DialogDescription className="flex flex-row justify-start gap-1">
              Manage{" "}
              <p className="font-semibold text-gray-900 ">{member?.name}</p>{" "}
              role in <p className="font-semibold text-pri ">{group?.name}</p>
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-md border border-gray-300 bg-white shadow">
            <div className="flex flex-row items-center justify-between px-5 py-2 ">
              <p className="font-semibold text-gray-900">
                Remove member from Group
              </p>
              <Button
                className="h-fit gap-1 bg-red-500 text-white transition hover:scale-105 hover:bg-gray-400"
                disabled={isLoading}
                onClick={() => handleClick()}
              >
                {isLoading ? (
                  <div className="flex flex-row gap-0.5">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                ) : (
                  <div className="flex flex-row gap-1">
                    Remove <UserX className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </div>
          </div>
          {currUser?.id === group?.creatorId ? (
            <div className="space-y-4">
              <div className="rounded-md border border-gray-300 bg-white shadow">
                <div className="flex flex-row items-center justify-between px-5 py-2 ">
                  <p className="font-semibold text-gray-900">
                    Ban member from Group
                  </p>
                  <Button
                    className="h-fit gap-1 bg-red-500 text-white transition hover:scale-105 hover:bg-gray-400"
                    disabled={isLoading}
                    onClick={() => handleBan()}
                  >
                    {isLoading ? (
                      <div className="flex flex-row gap-0.5">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    ) : (
                      <div className="flex flex-row gap-1">
                        Ban <Ban className="h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
              <div className="rounded-md border border-gray-300 bg-white shadow">
                {isModerator ? (
                  <div className="flex flex-row items-center justify-between px-5 py-2 ">
                    <p className="font-semibold text-gray-900">
                      Remove Moderator role
                    </p>
                    <Button
                      className="h-fit gap-1 bg-red-400 text-white transition hover:scale-105 hover:bg-gray-400"
                      disabled={isLoading}
                      onClick={() => handleUnMod()}
                    >
                      {isLoading ? (
                        <div className="flex flex-row gap-0.5">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                      ) : (
                        <div className="flex flex-row gap-1">
                          Change <ShieldBan  className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-between px-5 py-2 ">
                    <p className="font-semibold text-gray-900">
                      Make member a Moderator
                    </p>
                    <Button
                      className="h-fit gap-1 bg-green-400 text-white transition hover:scale-105 hover:bg-gray-400"
                      disabled={isLoading}
                      onClick={() => handleMod()}
                    >
                      {isLoading ? (
                        <div className="flex flex-row gap-0.5">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                      ) : (
                        <div className="flex flex-row gap-1">
                          Change <ShieldCheck className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMemberButton;
