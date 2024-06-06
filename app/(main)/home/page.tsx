import HomeCard from "@/components/home/center/HomeCard";

export const metadata = {
  title: "Home | BeanChillin",
  description: "Welcome to BeanChillin!",
};


const page = async () => {
  return (
    <div className="container mx-auto mt-3 w-5/6 px-12">
      <h2 className="text-3xl font-extrabold">Home</h2>
      <HomeCard />
    </div>
  );
};

export default page;
