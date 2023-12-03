import { Outlet } from "react-router";
import LeftSideBar from "../components/leftsidebar/LeftSideBar";
import RightSiderBar from "../components/rightsiderbar/RightSiderBar";
import { useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex w-full justify-center dark:bg-[#000]">
      <div className="flex flex-col self-stretch w-full xl:gap-10 xl:flex-row xl:w-auto ">
        <LeftSideBar />
        <div className="flex-grow">
          <Outlet />
        </div>
        {location.pathname === "/message" ? "" : <RightSiderBar />}
      </div>
    </div>
  );
};

export default MainLayout;
