"use client";

import Logo from "@/components/common-ui/logo/Logo";
import Button from "@/components/common-ui/button/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function ResetSuccess() {
  const router = useRouter();
  
  //auto push redirect user to login page after 7 seconds
  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 7000);
  });

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-[url('/patterns/pattern-light.png')]">
      <div className="flex items-center justify-center">
        <Logo src="/logo/logo.svg" width={200} height={200} className="mt-3" />
      </div>
      <div className="mx-auto mb-20 flex flex-1 items-center justify-between">
        <div className="mb-20 ml-8 flex flex-1 flex-col justify-start text-left">
            
          <h2 className="text-5xl font-extrabold text-gray-900">
            Your password has been updated.
          </h2>
          <p className="mt-2 text-left text-xl  text-gray-600">
            You will now be redirected to the login page where you can login
            again
          </p>

          <div className="mt-auto w-1/4">
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
        </div>
      </div>
    </main>
  );
}