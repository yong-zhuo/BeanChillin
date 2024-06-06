"use client";

import Button from "@/components/common-ui/button/Button";
import Header from "@/components/common-ui/form/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function ForgetSuccess() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };
  return (
    <>
      <Header
        heading="Link sent!"
        paragraph="Check your email address for further instructions on how to reset your password."
        logo
      />
      <div className="flex flex-col justify-center items-center">
        <Image src="/misc/mail.svg" alt="link" height={300} width={300} />
        <div className="mx-3 px-5 justify-center items-center flex w-1/2">
          <Button
            handleClick={handleClick}
            text="Back to Login"
            src="/misc/arrow-left.svg"
            alt="arrow-left"
            width={20}
            height={20}
            addClass="gap-2 bg-pri text-white hover:bg-slate-400 shadow transition ease-in-out duration-300 delay-50 hover:-translate-x-1"
            orientation="left"
          />
        </div>
      </div>
    </>
  );
}