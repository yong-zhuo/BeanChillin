"use client";
import Button from "@/components/common-ui/button/Button";
import Header from "../common-ui/form/Header";
import Image from "next/image";


const WelcomePage = () => {
  return (
    <div>
      <Header
        heading="Welcome to BeanChillin"
        paragraph="Start your journey now!"
      />
      <div className="flex justify-center">
        <Image src="/onboarding/welcome.svg" alt="Welcome Image" height={480} width={480} />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex w-1/2">
          <Button
            text="Go to Home Page"
            action="submit"
            addClass="text-white bg-pri hover:bg-slate-400 gap-2"
            src="/misc/home.svg"
            alt="home"
            width={20}
            height={20}
            orientation="left"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
