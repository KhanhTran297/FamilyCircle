import { Outlet } from "react-router";
import LeftSideBar from "../components/leftsidebar/LeftSideBar";
import RightSiderBar from "../components/rightsiderbar/RightSiderBar";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
const MainLayout = () => {
  const location = useLocation();
  const params = useParams();
  const checkPage = (path) => {
    if (
      path === "/message" ||
      path === "/community" ||
      params.communityName !== undefined
    ) {
      return true;
    }
    return false;
  };
  return (
    // <div className=" w-full dark:bg-[#000]">
    //   <div className="flex flex-col self-stretch w-full xl:gap-10 xl:flex-row xl:w-auto ">
    //     <LeftSideBar />
    //     <div className="flex-grow">
    //       <Outlet />
    //     </div>
    //     {checkPage(location.pathname) ? "" : <RightSiderBar />}
    //   </div>
    // </div>

    <div className=" w-full dark:bg-[#000]">
      <div
        className={`flex flex-col self-stretch  w-full xl:gap-10 xl:grid xl:grid-flow-col ${
          checkPage(location.pathname)
            ? "xl:grid-cols-[calc(25%-40px)_75%]"
            : "xl:grid-cols-[calc(25%-40px)_50%_calc(25%-40px)]"
        } `}
      >
        <LeftSideBar />

        <div className="flex-grow ">
          <Outlet />
        </div>

        {checkPage(location.pathname) ? "" : <RightSiderBar />}
      </div>
    </div>
  );
};

export default MainLayout;
