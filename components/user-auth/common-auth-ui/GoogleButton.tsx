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
      addClass="bg-white text-primary hover:bg-gray-400 gap-2"
      orientation="left"
    />
  );

};

export default GoogleButton;
