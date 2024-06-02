import ProfileCard from "./ProfileCard";
import TabsCard from "./TabsCard";

const LeftSideBar = () => {
  return (
    <div className="flex justify-start space-y-16 flex-col w-1/5 mt-10 pt-12">
      <ProfileCard />
      <TabsCard/>
    </div>
  );
};

export default LeftSideBar;
