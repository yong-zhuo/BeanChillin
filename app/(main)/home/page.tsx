import HomeCard from "@/components/home/center/HomeCard";
import { Home } from "lucide-react";

export const metadata = {
  title: "Home | BeanChillin",
  description: "Welcome to BeanChillin!",
};


const page = async () => {
  return (
    <div className="sm:container mx-auto mt-3  sm:w-5/6 sm:px-12">
      <h2 className="text-3xl font-extrabold text-center sm:text-start flex flex-row items-center justify-center gap-1 sm:justify-start">Home<Home className="w-7 h-7"/></h2>
      <HomeCard />
    </div>
  );
};

export default page;
