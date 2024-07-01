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
import { Loader2, Settings, UserX } from "lucide-react";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { Group, User } from "@prisma/client";
import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import {
  toast,
  useToast,
} from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { useRouter } from "next/navigation";
interface ManageMemberButtonProps {
  member: User | null;
  group: Group | null;
}

const ManageMemberButton = ({ member, group }: ManageMemberButtonProps) => {
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
          variant: "success",
          title: "Member removed",
          description: `You have removed ${member?.name} successfully`,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        router.refresh();
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
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex w-fit flex-row items-center justify-center gap-1 bg-gray-400 text-white transition hover:scale-105 hover:bg-gray-600">
            Manage Member
            <Settings className="h-5 w-5" />
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
                    Removing <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                ) : (
                  <div className="flex flex-row gap-1">
                    Remove <UserX className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMemberButton;
