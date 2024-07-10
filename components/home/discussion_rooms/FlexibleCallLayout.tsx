
import {
  CallControls,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
} from "@stream-io/video-react-sdk";
import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  LayoutGrid,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EndCallButton from "./EndCallButton";
import { User } from "@prisma/client";

type CallLayout = "speaker-vert" | "speaker-horiz" | "grid";

export default function FlexibleCallLayout({user}: {user: User}) {
  const [layout, setLayout] = useState<CallLayout>("speaker-vert");

  const call = useCall();

  const router = useRouter();

  return (
    <div className="space-y-3 mt-5">
      <CallLayoutButtons layout={layout} setLayout={setLayout} />
      <CallLayoutView layout={layout} />
      <CallControls onLeave={() => router.back()} />
      <EndCallButton user={user} />
    </div>
  );
}

interface CallLayoutButtonsProps {
  layout: CallLayout;
  setLayout: (layout: CallLayout) => void;
}

function CallLayoutButtons({ layout, setLayout }: CallLayoutButtonsProps) {
  return (
    <div className="mx-auto w-fit space-x-6 bg-white rounded-lg px-5">
      <button onClick={() => setLayout("speaker-vert")}>
        <BetweenVerticalEnd
          className={layout !== "speaker-vert" ? "text-gray-400 hover:bg-pri rounded-md " : ""}
        />
      </button>
      <button onClick={() => setLayout("speaker-horiz")}>
        <BetweenHorizonalEnd
          className={layout !== "speaker-horiz" ? "text-gray-400 hover:bg-pri rounded-md " : ""}
        />
      </button>
      <button onClick={() => setLayout("grid")}>
        <LayoutGrid className={layout !== "grid" ? "text-gray-400 hover:bg-pri rounded-md " : ""} />
      </button>
    </div>
  );
}

interface CallLayoutViewProps {
  layout: CallLayout;
}

function CallLayoutView({ layout }: CallLayoutViewProps) {
  if (layout === "speaker-vert") {
    return <SpeakerLayout />;
  }

  if (layout === "speaker-horiz") {
    return <SpeakerLayout participantsBarPosition="right" />;
  }

  if (layout === "grid") {
    return <PaginatedGridLayout />;
  }

  return null;
}