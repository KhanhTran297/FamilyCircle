import ExpertToFollow from "./ExpertToFollow";
import Search from "./Search";

const RightSiderBar = () => {
  return (
    <div className="xl:top-0 xl:right-0 xl:sticky  xl:flex flex-col gap-6 py-6 shrink-0 items-start  xl:max-w-[320px] shrinhk-0  xl:h-[100vh] ">
      <Search />
      <ExpertToFollow />
    </div>
  );
};

export default RightSiderBar;
