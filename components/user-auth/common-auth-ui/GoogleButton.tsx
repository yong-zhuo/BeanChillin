import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/common-ui/button/Button";

const GoogleButton = () => {
  const { data: session } = useSession();

  return (
    <Button
      handleClick={() => signIn("google", {})}
      text="Sign In with Google"
      src="/misc/Google.png"
      alt="Google"
      height={20}
      width={20}
      addClass="bg-white text-primary hover:bg-gray-300 delay-50 gap-2 shadow transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110"
      orientation="left"
    />
  );

};

export default GoogleButton;
