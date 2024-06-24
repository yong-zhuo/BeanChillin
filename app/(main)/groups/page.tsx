import Image from "next/image";
import CreateGroupModal from "@/components/home/group/CreateGroupModal";
import ViewGroupTabs from "@/components/home/group/ViewGroupTabs";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import { getServerSession } from "next-auth";
import { Oauth } from "@/lib/users/OAuth";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Groups | BeanChillin",
  description: "Welcome to BeanChillin!",
};

const GroupPage = async () => {

  let user = null;
    const session = await getServerSession(Oauth);

    if(session?.user?.email) {
      user = await prisma.user.findUnique({
          where: {
              email: session.user.email
          },
      });
    } else {
        return new Response('User not found', {status: 404})
    }


    const [memberships, createdGroups] = await Promise.all([
      prisma.membership.findMany({
        where: {
          userId: user?.id,
        },
        include: {
          group: true,
        },
      }), prisma.group.findMany({
        where: {
          creatorId: user?.id
        },
      })]);


    const joinedGroups = memberships.map((membership) => membership.group);


  return (
    <div className="container mx-auto mt-3 w-5/6 px-12">
      <h2 className="w-fit text-3xl font-extrabold flex flex-row gap-2 items-center">
        Groups
        <Image src="/misc/group.svg" alt="group" width={30} height={30} />
      </h2>
      <div className="order-first my-6 h-fit rounded-lg md:order-last">
        <div className="rounded-lg bg-pri px-6 py-1 shadow-md">
          <p className="flex items-center gap-1.5 py-3 font-semibold text-sec">
            <Image
              src="/home/create.svg"
              alt="group"
              width={30}
              height={30}
              className="pb-1"
            />
            Create a new Group
          </p>
        </div>
        <dl className="text-md -my-2 divide-y divide-pri bg-white px-6 py-2 leading-6">
          <div className="flex justify-between gap-x-4 py-3 ">
            <p className="text-zinc-500">
              Looking to form a new Group? Click on the button below to get
              started.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <CreateGroupModal />
          </div>
        </dl>
      </div>
      <Separator className="mb-2 bg-pri" />
      <div className="mt-1">
        <ViewGroupTabs joinedGroups={joinedGroups} createdGroups={createdGroups} />
      </div>
    </div>
  );
};

export default GroupPage;
