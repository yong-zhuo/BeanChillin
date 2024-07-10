import MeetingPage from "@/components/home/discussion_rooms/MeetingPage";
import VideoProvider from "@/components/home/discussion_rooms/VideoProvider";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string; groupId: string };
}

export function generateMetadata({
  params: { id, groupId },
}: PageProps): Metadata {
  return {
    title: `Room ${id} | BeanChillin`,
  };
}

const MeetPage = async ({ params: { id, groupId } }: PageProps) => {
  const session = await getServerSession(Oauth);

  if (!session) {
    return notFound();
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email as string,
    },
  });

  const membership = await prisma.membership.findFirst({
    where: {
      userId: user?.id,
      groupId: groupId,
    },
    include: {
      group: true,
    },
  });

  const isMember = !!membership;

  if (!isMember) {
    return notFound();
  }

  return (
    <VideoProvider user={user}>
      <div className="h-screen overflow-auto bg-[url('/patterns/pattern-light.png')]">
        <MeetingPage id={id} groupName={membership.group.name} user={user!} />
      </div>
    </VideoProvider>
  );
};

export default MeetPage;
