import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import FormButton from "@/components/common-ui/form/FormButton";

const GoogleButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <FormButton
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
    <FormButton
      handleClick={() => signIn('google', { callbackUrl: '/home' })}
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
