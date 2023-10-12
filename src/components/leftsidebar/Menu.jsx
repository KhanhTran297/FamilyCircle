// src/components/Menu.js
// import React from "react";
import { ILocalHome } from "../svg/home";
import { ILocalForum } from "../svg/forum";
import { ILocalNotification } from "../svg/notification";
import { ILocalMess } from "../svg/mess";
import { ILocalBookmark } from "../svg/bookmark";
import { ILocalProfile } from "../svg/profile";
import useTheme from "../../hooks/useTheme";
import { useLocation, useNavigate } from "react-router-dom";
import { ILocalHomeSelected } from "../svg/home_selected";
import { ILocalForumSelected } from "../svg/forum_selected";
import { ILocalNotificationSelected } from "../svg/noti_selected";
import { ILocalMessSelected } from "../svg/mess_selected";
import { ILocalBookmarkSelected } from "../svg/bookmark_selected";
import { ILocalProfileSelected } from "../svg/profile_selected";

const Menu = () => {
  const { theme } = useTheme({});
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const textColorSelected = theme === "dark" ? "#FFAFD5" : "#A73574";
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const handleRouter = (path) => {
    navigate(path);
  };
  return (
    <nav className="fixed xl:z-0 bottom-0 left-0 right-0 flex flex-row justify-around text-black dark:bg-[#000] xl:border-y-0 xl:flex-col xl:top-0 xl:left-0 xl:relative shadow-mobile xl:shadow-none xl:w-[196px] bg-white">
      <p
        className="flex items-center flex-shrink-0 cursor-pointer gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark "
        onClick={() => handleRouter("/index")}
      >
        {path === "/index" ? (
          <ILocalHomeSelected fill={textColorSelected} />
        ) : (
          <ILocalHome fill={textColor} />
        )}
        <p
          className={`hidden xl:block text-sm font-medium text-center  ${
            path === "/index"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          Home
        </p>
      </p>
      <p
        className="flex items-center cursor-pointer flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
        onClick={() => handleRouter("/forum")}
      >
        {path === "/forum" ? (
          <ILocalForumSelected fill={textColorSelected} />
        ) : (
          <ILocalForum fill={textColor} />
        )}
        <p
          className={`hidden xl:block text-sm font-medium text-center  ${
            path === "/forum"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          Forum
        </p>
      </p>
      <p
        className="flex items-center flex-shrink-0 cursor-pointer gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
        onClick={() => handleRouter("/notification")}
      >
        {path === "/notification" ? (
          <ILocalNotificationSelected fill={textColorSelected} />
        ) : (
          <ILocalNotification fill={textColor} />
        )}
        <p
          className={`hidden xl:block text-sm font-medium text-center  ${
            path === "/notification"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          Notification
        </p>
      </p>
      <p
        className="flex items-center flex-shrink-0 cursor-pointer gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
        onClick={() => handleRouter("/message")}
      >
        {path === "/message" ? (
          <ILocalMessSelected fill={textColorSelected} />
        ) : (
          <ILocalMess fill={textColor} />
        )}
        <p
          className={`hidden xl:block text-sm font-medium text-center  ${
            path === "/message"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          {" "}
          Message
        </p>
      </p>
      <p
        className="hidden xl:flex items-center cursor-pointer flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
        onClick={() => handleRouter("/bookmark")}
      >
        {path === "/bookmark" ? (
          <ILocalBookmarkSelected fill={textColorSelected} />
        ) : (
          <ILocalBookmark fill={textColor} />
        )}
        <p
          className={` text-sm font-medium text-center  ${
            path === "/bookmark"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          Bookmark
        </p>
      </p>
      <p
        className="flex items-center flex-shrink-0 cursor-pointer gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
        onClick={() => handleRouter("/profile")}
      >
        {path === "/profile" ? (
          <ILocalProfileSelected fill={textColorSelected} />
        ) : (
          <ILocalProfile fill={textColor} />
        )}
        <p
          className={`hidden xl:block text-sm font-medium text-center  ${
            path === "/profile"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          Profile
        </p>
      </p>
    </nav>
  );
};

export default Menu;
