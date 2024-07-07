"use client";

import Image from "next/image";
import Logo from "@/components/common-ui/logo/Logo";

import { useRouter } from "next/navigation";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
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
            height={500}
            width={500}
            className="object-contain"
          />
        </div>
        <div className="mb-20 ml-8 flex flex-1 flex-col justify-start text-left">
          <h2 className="text-2xl sm:text-5xl font-extrabold text-gray-900">Oops...</h2>
          <p className="mt-2 text-left text-sm sm:text-xl  text-gray-600">
            Sorry, the page that you are looking for does not seem to exist or has been removed
          </p>

          <div className="mt-2 w-1/4">
            <Button onClick={async () => router.back()} className="bg-pri w-fit h-fit shadow rounded-md sm:text-md text-xs text-white hover:bg-slate-500 hover:scale-105 transition"><ArrowLeft className="w-5 h-5"/>Back to previous page</Button>
          </div> 
        </div>
      </div>
    </main>
  );
}
