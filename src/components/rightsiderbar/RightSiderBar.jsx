import ExpertToFollow from "./ExpertToFollow";
import Search from "./Search";

const RightSiderBar = () => {
  return (
    <div className="desktop:top-0 desktop:right-0 desktop:sticky block desktop:max-w-[320px] desktop:h-[100vh]">
      <div className="flex-col items-start gap-6 py-6 desktop:flex">
        <Search />
        <ExpertToFollow />
      </div>
    </div>
  );
};

export default RightSiderBar;
