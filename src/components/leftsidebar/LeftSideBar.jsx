import Menu from "./Menu";
import SwitchMode from "../shared/SwitchMode";
import UserSetting from "../shared/UserSetting";
import NewPost from "../shared/NewPost";
import { ILocalLogo } from "../svg/svg";

const LeftSideBar = () => {
  return (
    <nav className="xl:top-0 xl:left-0 xl:sticky text-black block w-100vw  xl:max-w-[280px]   xl:h-[100vh]">
      <div
        className="flex justify-between  w-full p-2 text-left h-14 xl:h-[100vh] xl:p-6 xl:gap-6 xl:flex-col fixed top-0 xl:relative
        shadow-mobile xl:shadow-none bg-white"
      >
        <div className="w-[46.337px] h-10 xl:w-[74.139px] xl:h-16 ml-4  ">
          <ILocalLogo />
        </div>
        <NewPost />
        <div className="h-[615px]">
          <Menu />
        </div>
        <UserSetting />
        <div className="w-[232px] h-[1px] bg-[#F1DEE4] hidden xl:inline-block"></div>
        <SwitchMode />
      </div>
    </nav>
  );
};

export default LeftSideBar;
