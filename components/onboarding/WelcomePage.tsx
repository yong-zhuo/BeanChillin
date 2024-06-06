
import Button from "@/components/common-ui/button/Button";
import Header from "../common-ui/form/Header";
import Image from "next/image";
import { Bean } from "lucide-react";

interface WelcomeProps {
  state:boolean
}

const WelcomePage = ({state}:WelcomeProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-4 flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-pri md:hidden">
        <Bean className="text-sec" />
      </div>
      <Header
        heading="Welcome to BeanChillin"
        paragraph="Start your journey now!"
      />
      <div className="flex justify-center">
        <Image src="/onboarding/welcome.svg" alt="Welcome Image" height={480} width={480} className="min-w-[300px]"/>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex w-1/2 min-w-[200px]">
          <Button
            text="Go to Home Page"
            action="submit"
            addClass="text-white bg-pri hover:bg-slate-400 gap-2 transition hover:translate-y-1 hover:shadow-lg"
            src="/misc/home.svg"
            alt="home"
            width={20}
            height={20}
            orientation="left"
            state={state}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
