import Menu from "./Menu";
import SwitchMode from "../shared/SwitchMode";
import UserSetting from "../shared/UserSetting";
import NewPost from "../shared/NewPost";
import { ILocalLogo } from "../svg/svg";
import useAccount from "../../hooks/useAccount";

const LeftSideBar = () => {
  const { accountProfile } = useAccount();
  return (
    <nav className="desktop:top-0 w-full desktop:left-0 desktop:sticky text-black block   desktop:max-w-[280px] dark:bg-black   desktop:h-[100vh]">
      <div
        className="flex justify-between  w-full p-2 dark:bg-black  text-left h-14 desktop:h-[100vh] desktop:p-6 desktop:gap-6 desktop:flex-col fixed top-0 desktop:relative
        shadow-mobile desktop:shadow-none bg-white z-10"
      >
        <div className="w-[46.337px] h-10 desktop:w-[74.139px] desktop:h-16 ml-4 desktop:ml-0 ">
          <ILocalLogo />
        </div>
        <NewPost />
        <div className="h-[615px]">
          <Menu />
        </div>
        <UserSetting />
        <div className="w-[232px] h-[1px] bg-[#F1DEE4] hidden desktop:inline-block"></div>
        <SwitchMode />
      </div>
    </nav>
  );
};

export default LeftSideBar;
