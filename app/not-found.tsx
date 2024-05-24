"use client";

import Image from "next/image";
import Logo from "@/components/common-ui/logo/Logo";
import Button from "@/components/common-ui/button/Button";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-[url('/patterns/pattern-light.png')]">
      <div className="flex items-center justify-center">
        <Logo src="/logo/logo.svg" width={200} height={200} className="mt-3" />
      </div>
      <div className="mx-auto mb-20 flex flex-1 items-center justify-between">
        <div className="flex h-4/5 w-4/5 flex-1">
          <Image
            src="/not-found/404.svg"
            alt="404"
            height={700}
            width={700}
            className="object-contain"
          />
        </div>
        <div className="mb-20 ml-8 flex flex-1 flex-col justify-start text-left">
          <h2 className="text-5xl font-extrabold text-gray-900">Oops...</h2>
          <p className="mt-2 text-left text-xl  text-gray-600">
            Sorry, the page that you are looking for does not seem to exist
          </p>
          <p className="text-left text-xl  text-gray-600">
            or has been removed
          </p>
          <div className="mt-auto w-1/4">
            <Button
              handleClick={handleClick}
              text="Back to Login"
              src="/misc/arrow-left.svg"
              alt="arrow-left"
              width={20}
              height={20}
              addClass="gap-2 bg-primary text-white hover:bg-slate-400"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
