import { Outlet } from "react-router-dom";
import SwitchDarkMode from "../components/shared/SwitchDarkMode";

const AuthenticationLayout = () => {
  localStorage.clear();
  return (
    <div className="absolute w-full h-screen ">
      {/* <div className="flex flex-row items-center justify-between p-2 bg-white  dark:bg-black">
        <div className="relative w-10 h-10 ">
          <img
            src="/logo.jpg"
            alt=""
            className="absolute w-full h-full rounded-full "
          />
        </div>
        <SwitchDarkMode />
      </div> */}
      <Outlet />
    </div>
  );
};

export default AuthenticationLayout;
