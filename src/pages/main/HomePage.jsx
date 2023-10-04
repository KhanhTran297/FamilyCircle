// import { useNavigate } from "react-router-dom";
// import UseCookie from "../../hooks/UseCookie";
import Home from "../../components/home/Home";
import LeftSideBar from "../../components/leftsidebar/LeftSideBar";
import RightSiderBar from "../../components/rightsiderbar/RightSiderBar";

const HomePage = () => {
  // const { removeToken } = UseCookie();
  // const handleLogout = () => {
  //   removeToken();
  //   navigate("/");
  // };
  // const navigate = useNavigate();
  return (
    <div className="flex xl:w-full xl:justify-center dark:bg-[#000]">
      <div className="flex flex-col w-full gap-0 xl:gap-10 xl:flex-row xl:w-auto">
        <LeftSideBar />
        <Home />
        <RightSiderBar />
      </div>
    </div>
  );
};

export default HomePage;
