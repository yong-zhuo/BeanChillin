"use client";

import { Button } from "@/components/common-ui/shadcn-ui/button";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import CreateFriend from "@/lib/friends/CreateFriend";
import UpdateFriend from "@/lib/friends/UpdateFriend";
import { useRouter } from "next/navigation";
import {
  Clock,
  UserCheck,
  UserMinus,
  UserPlus,
  UserRound,
  UserRoundX,
} from "lucide-react";
import createNotif from "@/lib/notifications/createNotif";

type Props = {
  sender_status: string;
  receiver_status: string;
  receiver_id: string;
};

const FriendRequestButton = (props: Props) => {
  const router = useRouter();

  async function AddFriend() {
    const data = {
      sender_id: user?.id!,
      receiver_id: receiver_id,
      status: "Friend",
      id: "",
    };
    const notifData = {
      fromId: user?.id!,
      toId: receiver_id,
      type: "friendRequest",
    }
    await Promise.all([CreateFriend(data), createNotif(notifData, 'friendRequest')]);
    router.refresh();
  }

  async function Accept() {
    const data = {
      sender_id: user?.id!,
      receiver_id: receiver_id,
      status: "Friend",
      id: "",
    };
    const notifData = {
      fromId: user?.id!,
      toId: receiver_id,
      type: "acceptFriendRequest",
    }
    await Promise.all([UpdateFriend(data), createNotif(notifData, 'acceptFriendRequest')]);
    router.refresh();
  }

  async function Decline() {
    const data = {
      sender_id: user?.id!,
      receiver_id: receiver_id,
      status: "NotFriend",
      id: "",
    };
    await UpdateFriend(data);
    router.refresh();
  }

  const { sender_status, receiver_status, receiver_id } = props;
  const { user } = useContext(UserContext);
  return receiver_status === "Confirm" ? ( //If the user is viewing their own profile //If receiver status is pending
    <Button
      className="flex w-fit flex-row items-center justify-center gap-1 bg-gray-400 text-white transition hover:scale-105 hover:bg-gray-400"
      disabled
    >
      Pending
      <Clock className="h-5 w-5" />
    </Button>
  ) : sender_status === "Confirm" ? ( //If receiver status is confirm
    <div className="flex flex-row justify-between gap-2">
      <Button
        className="flex w-fit flex-row items-center justify-center gap-1 bg-pri text-white transition hover:scale-105 hover:bg-gray-400"
        onClick={async () => Accept()}
      >
        Accept
        <UserCheck className="h-5 w-5" />
      </Button>
      <Button
        className="flex w-fit flex-row items-center justify-center gap-1 bg-red-400 text-white transition hover:scale-105 hover:bg-gray-400"
        onClick={async () => Decline()}
      >
        Decline
        <UserRoundX className="h-5 w-5" />
      </Button>
    </div>
  ) : receiver_status === "Friend" ? ( //If status is friend
    <Button
      className="flex w-fit flex-row items-center justify-center gap-1 bg-red-400 text-white transition hover:scale-105 hover:bg-gray-400"
      onClick={async () => Decline()}
    >
      Remove Friend <UserMinus className="h-5 w-5" />
    </Button>
  ) : (
    <Button
      className="flex w-fit flex-row items-center justify-center gap-1 bg-pri text-white transition hover:scale-105 hover:bg-gray-400"
      onClick={async () => AddFriend()}
    >
      Add Friend
      <UserPlus className="h-5 w-5" />
    </Button>
  );
};

export default FriendRequestButton;
