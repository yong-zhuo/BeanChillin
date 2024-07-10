"use client";

import {
  Call,
  CallControls,
  CallingState,
  DeviceSettings,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import useLoadCall from "@/hooks/useLoadCall";
import Link from "next/link";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { useRouter } from "next/navigation";
import AudioVolumeIndicator from "./AudioVolumeIndicator";
import PermissionPrompt from "./PermissionPrompt";
import FlexibleCallLayout from "./FlexibleCallLayout";
import { User } from "@prisma/client";
interface MeetingPageProps {
  id: string;
  groupName: string
  user: User;
}

export default function MeetingPage({ id, groupName, user }: MeetingPageProps) {
  const { call, callLoading } = useLoadCall(id);

  const client = useStreamVideoClient();

  if (!client || callLoading) {
    return (
      <div className="flex h-full flex-col justify-center items-center">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }
  if (!call) {
    return <div className="h-screen text-center font-bold">Call not found</div>;
  }

  return (
    <StreamCall call={call}>
      <StreamTheme className="space-y-3">
        <MeetingScreen groupName={groupName} user={user} />
      </StreamTheme>
    </StreamCall>
  );
}

function MeetingScreen({groupName, user}: {groupName: string; user: User}) {
  const call = useCall();

  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const [setupComplete, setSetupComplete] = useState(false);
  const callEndedAt = useCallEndedAt();
  const callHasEnded = !!callEndedAt;

  async function handleSetupComplete() {
    call?.join();
    setSetupComplete(true);
  }

  if (callHasEnded) {
    return <MeetingEndedScreen groupName={groupName} />;
  }

  const title = call?.state.custom.title;
  const description = call?.state.custom.description;
 
  return (
    <div className=" ">
      {setupComplete ? (
        <div>
          <CallUI user={user} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  h-screen">
            <div className="space-y-6 px-10 py-5 bg-white w-1/2 rounded-lg shadow ">
              {title && (
                <p className="text-center">
                  Title: <span className="font-bold">{title}</span>
                </p>
              )}
              {description && (
                <p className="text-center">
                  Description: <span className="font-bold">{description}</span>
                </p>
              )}
              <SetupUI onSetupComplete={handleSetupComplete} />
            </div>
        </div>
      )}
    </div>
  );
}

interface SetupUIProps {
  onSetupComplete: () => void;
}

function SetupUI({ onSetupComplete }: SetupUIProps) {
  const call = useCall();

  const { useMicrophoneState, useCameraState } = useCallStateHooks();

  const micState = useMicrophoneState();
  const camState = useCameraState();

  const [micCamDisabled, setMicCamDisabled] = useState(false);

  useEffect(() => {
    if (micCamDisabled) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [micCamDisabled, call]);

  if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
    return <PermissionPrompt />;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center gap-3">
        <AudioVolumeIndicator />
        <DeviceSettings />
      </div>
      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={micCamDisabled}
          onChange={(e) => setMicCamDisabled(e.target.checked)}
        />
        Join with mic and camera off 
      </label>
      <Button
        onClick={onSetupComplete}
        className="w-fit rounded-md bg-pri text-white shadow transition hover:scale-105 hover:bg-slate-500"
      >
        Enter room
      </Button>
    </div>
  );
}

function CallUI({user}: {user: User}) {
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  return <FlexibleCallLayout user={user} />;
}

function MeetingEndedScreen({groupName}: {groupName: string}) {
  const router = useRouter();
  return (
    <div className=" flex  flex-col items-center justify-center h-screen ">
      <div className="flex flex-col bg-white rounded-lg shadow w-fit p-5 gap-6  items-center justify-center">
          <p className="font-bold">This call has ended</p>
          <Button onClick={() => {router.push(`/groups/${groupName} `); router.refresh();}} className="bg-pri w-fit text-white hover:scale-105 hover:bg-slate-400 transition">Back to Group</Button>
      </div>
    </div>
  );
}
