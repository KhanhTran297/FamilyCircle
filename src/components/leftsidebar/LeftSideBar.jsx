import Menu from "./Menu";
import SwitchMode from "../shared/SwitchMode";
import UserSetting from "../shared/UserSetting";

const LeftSideBar = () => {
  return (
    <nav className="xl:top-0 xl:left-0 xl:sticky text-black block w-100vw  xl:w-[280px]   xl:h-[100vh]">
      <div
        className="flex justify-between  w-full p-2 text-left h-14 xl:h-[100vh] xl:p-6 xl:gap-6 xl:flex-col fixed top-0 xl:relative
        shadow-mobile xl:shadow-none bg-white"
      >
        <div className="w-[46.337px] h-10 xl:w-[74.139px] xl:h-16 ml-4  ">
          <img src="/src/assets/icons/logo.svg" alt="logo icon" />
        </div>
        <button className=" fixed bottom-[56px] right-0 m-4 xl:m-0 xl:top-0  xl:left-0 xl:relative   xl:w-[136px] h-14 w-14      rounded-[28px]  xl:pl-4 xl:pt-[10px] xl:pb-[10px] bg-[#FFD8E8] dark:bg-[#772956]  ">
          <div className="xl:width-[96px] xl:h-9 flex items-center justify-center xl:justify-normal">
            <div className="flex items-center w-6 h-6 xl:mr-3 ">
              <img
                src="src\assets\icons\post.svg"
                alt="post icon"
                className="inline-block dark:hidden"
              />
              <img
                src="src\assets\icons\postdark.svg"
                alt=""
                className="hidden dark:inline-block"
              />
            </div>
            <p className="hidden xl:block font-medium text-[#3D0027]  text-sm dark:text-[#FFD8E8] font-roboto z-10  ">
              New Post
            </p>
          </div>
        </button>
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
