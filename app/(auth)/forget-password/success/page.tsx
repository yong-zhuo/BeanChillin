"use client"

import Button from "@/components/common-ui/button/Button"
import Header from "@/components/common-ui/form/Header"
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };
  return (
    <>
      <Header
        heading="Sucess!"
        paragraph="Check your email address for further instructions on how to reset your password."
        logo
      />
        <div className="mx-3 px-5">
        <Button
              handleClick={handleClick}
              text="Back to Login"
              src="/misc/arrow-left.svg"
              alt="arrow-left"
              width={20}
              height={20}
              addClass="gap-2 bg-pri text-white hover:bg-slate-400"
              orientation="left"
            />
        </div>
    </>
  );
}
