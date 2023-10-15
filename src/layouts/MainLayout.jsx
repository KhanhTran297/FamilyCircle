import { Outlet } from "react-router";
import LeftSideBar from "../components/leftsidebar/LeftSideBar";
import RightSiderBar from "../components/rightsiderbar/RightSiderBar";

const MainLayout = () => {
  return (
    <div className="flex xl:w-full xl:justify-center dark:bg-[#000]">
      <div className="flex flex-col self-stretch w-full xl:gap-10 xl:flex-row xl:w-auto">
        <LeftSideBar />
        <Outlet />
        <RightSiderBar />
      </div>
    </div>
  );
};

export default MainLayout;
