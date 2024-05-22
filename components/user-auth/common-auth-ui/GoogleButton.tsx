import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "@/components/common-ui/button/Button";

const GoogleButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button
        handleClick={() => signOut()}
        text="Sign Out with Google"
        src="/misc/Google.png"
        alt="Google"
        height={20}
        width={20}
        addClass="bg-white text-primary hover:bg-gray-400 gap-2"
      />
    );
  }
  return (
    <Button
      handleClick={() => signIn()}
      text="Sign In with Google"
      src="/misc/Google.png"
      alt="Google"
      height={20}
      width={20}
      addClass="bg-white text-primary hover:bg-gray-400 gap-2"
    />
  );
};

export default GoogleButton;
