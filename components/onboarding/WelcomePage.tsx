
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
      <Image src="/onboarding/welcome.svg" alt="Welcome Image" height={280} width={280} className="min-w-[300px] min-h-[200px] w-[350px] h-[200px] lg:w-[350px] lg:h-[200px] 2mxl:w-[400px] 2mxl:h-[200px] 3mxl:h-[280px] 3mxl:w-[400px] 3xl:w-[400px] 3xl:h-[400px]"/>
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
