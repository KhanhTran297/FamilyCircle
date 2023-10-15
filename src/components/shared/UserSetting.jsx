import useTheme from "../../hooks/useTheme";
import AvtUser from "./AvtUser";
import { ILocalMore } from "../svg/more";
import { useSelector } from "react-redux";
import useAccount from "../../hooks/useAccount";
import UseCookie from "../../hooks/UseCookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "antd";

const UserSetting = () => {
  const { removeToken } = UseCookie();

  const selectorAccount = useSelector((state) => state.account);
  const userAccount = selectorAccount.account;
  const selectorExpert = useSelector((state) => state.expert);
  const userExpert = selectorExpert.expert;
  const navigate = useNavigate();
  //methods
  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        handleLogout();
        break;
      default:
        break;
    }
  };
  const items = [
    {
      label: (
        <button className="w-12 h-12">
          <p className="text-sm font-medium font-roboto">Log out</p>
        </button>
      ),
      key: "1",
    },
  ];
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
      <Dropdown
        menu={{
          items,
          onClick,
        }}
        placement="topRight"
      >
        <div
          className="flex flex-col items-center justify-center rounded-[20px] hover:bg-tab hover:bg-opacity-[8%] cursor-pointer w-10 h-10 gap-[10px] p-[10px]"
          onClick={(e) => e.preventDefault()}
        >
          <ILocalMore fill={textColor} />
        </div>
      </Dropdown>
    </div>
  );
};

export default UserSetting;
