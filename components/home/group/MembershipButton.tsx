"use client";

import Button from "@/components/common-ui/button/Button";
import { LogOut, Plus, Trash } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { User } from "@prisma/client";
//TODO:Create tabs list for group page
const MembershipButton = ({
  status,
  creator,
}: {
  status: boolean;
  creator: User | null;
}) => {
  const { user } = useContext(UserContext);
  const isCreator = user?.id === creator?.id;
  return (
    <>
      {isCreator ? (
        <Button
          addClass="bg-red-400 text-white w-1/3 text-sm md:w-fit mt-0 mr-0 md:mr-3 hover:bg-slate-400 transition hover:-translate-y-1 hover:-translate-x-1 shadow-md"
          text="Delete Group"
          action="submit"
        >
          <Trash className="h-5 w-5" />
        </Button>
      ) : status ? (
        <Button
          addClass="bg-red-400 text-white w-1/3 text-sm md:w-fit mt-0 mr-0 md:mr-3 hover:bg-slate-400 transition hover:-translate-y-1 hover:-translate-x-1 shadow-md"
          text="Leave Group"
          action="submit"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          addClass="bg-pri text-white w-1/3 text-sm md:w-fit mr-0 mx-2 md:mr-3 hover:bg-slate-400 transition hover:-translate-y-1 hover:-translate-x-1 shadow-md"
          text="Join Group"
          action="submit"
        >
          <Plus className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default MembershipButton;
