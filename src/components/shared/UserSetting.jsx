import useTheme from "../../hooks/useTheme";
import AvtUser from "./AvtUser";
import { ILocalMore } from "../svg/more";
import { useSelector } from "react-redux";
import useAccount from "../../hooks/useAccount";
import UseCookie from "../../hooks/UseCookie";
import { useEffect, useState } from "react";

const UserSetting = () => {
  const { removeToken } = UseCookie();

  const selectorAccount = useSelector((state) => state.account);
  const userAccount = selectorAccount.account;
  const selectorExpert = useSelector((state) => state.expert);
  const userExpert = selectorExpert.expert;

  //methods
  const handleLogout = () => {
    // logout();
    removeToken();
  };

  const { theme } = useTheme({});
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  return (
    <div className="items-center self-stretch hidden gap-2 xl:flex">
      <AvtUser />
      <div className="xl:h-9 xl:w-[136px]">
        <p className="text-[#1F1A1C] font-medium items-center text-sm dark:text-[#CEC4C6] font-roboto">
          {userAccount?.userFullName || userExpert?.expertFullName}
        </p>
        <p className="text-[#1F1A1C] font-normal text-xs dark:text-[#CEC4C6] font-roboto">
          {userAccount?.userKind === 2
            ? "User"
            : "" || userExpert?.expertKind === 3
            ? "Expert"
            : ""}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-[20px] hover:bg-tab hover:bg-opacity-[8%] cursor-pointer w-10 h-10 gap-[10px] p-[10px]">
        <ILocalMore fill={textColor} />
      </div>
    </div>
  );
};

export default UserSetting;
