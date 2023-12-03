// import { useNavigate } from "react-router-dom";
// import UseCookie from "../../hooks/UseCookie";
// import Home from "../../components/home/Home";
// import LeftSideBar from "../../components/leftsidebar/LeftSideBar";
// import RightSiderBar from "../../components/rightsiderbar/RightSiderBar";
import Tab from "../../components/tab/Tab";
import useAccount from "../../hooks/useAccount";

const HomePage = () => {
  const { accountProfile } = useAccount();

  // const { removeToken } = UseCookie();
  // const handleLogout = () => {
  //   removeToken();
  //   navigate("/");
  // };
  // const navigate = useNavigate();

  return (
    // <div className="flex xl:w-full xl:justify-center dark:bg-[#000]">
    //   <div className="flex flex-col w-full gap-0 xl:gap-10 xl:flex-row xl:w-auto">
    //     <LeftSideBar />
    //     <Home kind={1} />
    //     <RightSiderBar />
    //   </div>
    // </div>
    <div className="w-full">
      <div className="flex self-stretch justify-center w-full desktop:w-[760px]">
        <Tab kind="1" accountId={accountProfile?.data?.id} />
      </div>
    </div>
  );
};

export default HomePage;
