import Button from "@/components/common-ui/button/Button";
import SignOut from "@/components/home/navbar/SignOut";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};

const page = (props: Props) => {


 

  return (
    <div>
      <SignOut />
    </div>
  );
};

export default page;
