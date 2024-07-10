"use client";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { deleteRoom } from "@/lib/videocall/action";
import { User } from "@prisma/client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

export default function EndCallButton({user}: {user: User}) {
  const call = useCall();
  const { toast } = useToast();
  //const { useLocalParticipant } = useCallStateHooks();
  //const localParticipant = useLocalParticipant();

  const participantIsChannelOwner =
    user &&
    call?.state.custom.createdBy &&
    user.id === call.state.custom.createdBy;

  if (!participantIsChannelOwner) {
    return null;
  }

  async function handleEndCall() {
    try {
      const res = await fetch(`/api/room/delete?callId=${call?.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to end call");
      }
      call?.endCall();
      toast({
        title: "Call ended successfully",
        description: "The call has been ended for everyone",
        variant: "event",
      });
    } catch (e) {
      toast({
        title: "Failed to end call",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <Button
      onClick={() => handleEndCall()}
      className="mx-auto block rounded-md bg-red-400  font-medium text-white shadow transition hover:scale-105 hover:bg-slate-400"
    >
      End call for everyone
    </Button>
  );
}
