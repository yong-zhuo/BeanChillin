import SuggestedCard from "./SuggestedCard";

const RightSideBar = async () => {
  return (
    <div className="sticky mt-10 hidden w-1/4 flex-col justify-start space-y-48 pt-12 lg:block">
      <SuggestedCard name="Groups" />
      <SuggestedCard name="Friends" />
    </div>
  );
};

export default RightSideBar;
