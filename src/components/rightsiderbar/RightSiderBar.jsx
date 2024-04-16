import Community from "./Community";
import SearchingUsers from "./SearchingUsers";
const RightSiderBar = () => {
  return (
    <div className="desktop:top-0 desktop:right-0 desktop:sticky xl:block desktop:w-full desktop:h-[100vh] hidden ">
      <div className="flex-col items-start gap-6 py-6 desktop:flex">
        <SearchingUsers />
        <Community />
      </div>
    </div>
  );
};

export default RightSiderBar;
