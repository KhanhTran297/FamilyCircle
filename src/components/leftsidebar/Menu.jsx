// src/components/Menu.js
// import React from "react";
import * as reactRouterDom from "react-router-dom";
import { ILocalHome } from "../svg/home";
import { ILocalForum } from "../svg/forum";
import { ILocalNotification } from "../svg/notification";
import { ILocalMess } from "../svg/mess";
import { ILocalBookmark } from "../svg/bookmark";
import { ILocalProfile } from "../svg/profile";
import useTheme from "../../hooks/useTheme";

const Menu = () => {
  const { theme } = useTheme({});
  const navigate = reactRouterDom.useNavigate();
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="fixed xl:z-0 bottom-0 left-0 right-0 flex flex-row justify-around text-black  xl:border-y-0 xl:flex-col xl:top-0 xl:left-0 xl:relative shadow-mobile xl:shadow-none xl:w-[196px] bg-white">
      <button
        onClick={() => handleNavigation("/index")}
        className="flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu active:bg-menu "
      >
        <ILocalHome fill={textColor} />
        <p className="hidden xl:block text-sm font-medium text-center text-[#1F1A1C] dark:text-[#CEC4C6] font-roboto">
          Home
        </p>
      </button>
      <button
        onClick={() => handleNavigation("/")}
        className="flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu"
      >
        <ILocalForum fill={textColor} />
        <p className="hidden xl:block text-sm font-medium text-center text-[#1F1A1C] dark:text-[#CEC4C6] font-roboto">
          Forum
        </p>
      </button>
      <button
        onClick={() => handleNavigation("/")}
        className="flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu"
      >
        <ILocalNotification fill={textColor} />
        <p className="hidden xl:block text-sm font-medium text-center text-[#1F1A1C] dark:text-[#CEC4C6] font-roboto ">
          Notification
        </p>
      </button>
      <button
        onClick={() => handleNavigation("/")}
        className="flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu"
      >
        <ILocalMess fill={textColor} />
        <p className="hidden xl:block text-sm font-medium text-center text-[#1F1A1C] dark:text-[#CEC4C6] font-roboto">
          Message
        </p>
      </button>
      <button
        onClick={() => handleNavigation("/")}
        className="flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu"
      >
        <ILocalBookmark fill={textColor} />
        <p className="hidden xl:block text-sm font-medium text-center text-[#1F1A1C] dark:text-[#CEC4C6] font-roboto">
          Bookmark
        </p>
      </button>
      <button
        onClick={() => handleNavigation("/")}
        className="hidden xl:flex items-center flex-shrink-0 gap-4 h-[48px] px-4 hover:bg-menu"
      >
        <ILocalProfile fill={textColor} />
        <p className="text-sm font-medium text-center text-[#1F1A1C] dark:text-[#CEC4C6] font-roboto">
          Profile
        </p>
      </button>
    </nav>
  );
};

export default Menu;
