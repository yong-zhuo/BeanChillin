import Logo from "../common-ui/logo/Logo";

interface StepsProps {
  step: string;
  text: string;
}

const StepsBox = (props: StepsProps) => {
  return (
    <div className="hidden sm:block h-full w-1/2 rounded-bl-lg rounded-tl-lg bg-secondary p-4 ">
      <Logo src="/logo/logo.svg" width={120} height={100} className="mb-4" />
      <div className="h-5/6 flex-1 flex-col  flex">
          <div className="flex justify-center h-2/3 items-center ">
            Image
          </div>
      </div>
      
    </div>
  );
};

export default StepsBox;
