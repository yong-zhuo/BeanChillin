'use client'

import Button from "@/components/common-ui/button/Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";

type Props = {};

const SignOut = (props: Props) => {
  const handleClick = () => {
    signOut({redirect: false}).then(() => {router.push("/login")});
  };
  const router = useRouter();
  return (
    <Button
      text="Sign Out"
      addClass=" text-white bg-pri hover:bg-slate-400"
      handleClick={handleClick}
    />
  );
};

export default SignOut;
