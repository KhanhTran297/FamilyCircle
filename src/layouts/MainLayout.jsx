import { Outlet } from "react-router";
import LeftSideBar from "../components/leftsidebar/LeftSideBar";
import RightSiderBar from "../components/rightsiderbar/RightSiderBar";

const MainLayout = () => {
  return (
    <div className="flex w-full justify-center dark:bg-[#000]">
      <div className="flex flex-col self-stretch w-full desktop:gap-10 desktop:flex-row desktop:w-auto ">
        <LeftSideBar />
        <Outlet />
        <RightSiderBar />
      </div>
    </div>
  );
};

export default MainLayout;
