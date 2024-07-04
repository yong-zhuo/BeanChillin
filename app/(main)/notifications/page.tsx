import Image from "next/image";

const page = async () => {
  return (
    <div className="mx-auto mt-3 w-full sm:container sm:w-5/6 sm:px-12">
      <h2 className="mb-3 flex flex-row items-center justify-center gap-2 text-3xl font-extrabold sm:justify-normal">
        Notifications
        <Image src="/home/bell.svg" alt="notification" width={30} height={30} />
      </h2>
      <div className="flex h-full flex-col items-center justify-between bg-white sm:flex-row sm:items-start">
        <div className="w-full flex-1 rounded-md bg-white p-4 sm:w-0 text-gray-500 ">No new notifications</div>
      </div>
    </div>
  );
};

export default page;
