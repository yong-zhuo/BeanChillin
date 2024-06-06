import ProfileCard from "./ProfileCard";
import TabsCard from "./TabsCard";

const LeftSideBar = () => {
  return (
    <div className="hidden md:block justify-start space-y-16 flex-col w-2/5 lg:w-1/4 mt-10 pt-12">
      <ProfileCard />
      <TabsCard/>
    </div>
  );
};

export default LeftSideBar;
