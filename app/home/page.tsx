import Image from "next/image";
import CreateGroupModal from "@/components/home/group/CreateGroupModal";
import ViewGroupTabs from "@/components/home/group/ViewGroupTabs";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
const GroupPage = () => {
  return (
    <div className="container mx-auto mt-3 w-5/6 px-12">
      <h2 className="text-3xl font-extrabold">Groups</h2>
      <div className="order-first my-6 h-fit rounded-lg md:order-last">
        <div className="bg-pri px-6 py-1 rounded-lg shadow">
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
      <Separator className="bg-pri mb-2" />
      <div className="mt-1">
        <ViewGroupTabs />
      </div>
    </div>
  );
};

export default GroupPage;
