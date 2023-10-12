// src/components/Menu.js
// import React from "react";
import { ILocalHome } from "../svg/home";
import { ILocalForum } from "../svg/forum";
import { ILocalNotification } from "../svg/notification";
import { ILocalMess } from "../svg/mess";
import { ILocalBookmark } from "../svg/bookmark";
import { ILocalProfile } from "../svg/profile";
import useTheme from "../../hooks/useTheme";
import { Link } from "react-router-dom";
import { useState } from "react";
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
  const [selectedLink, setSelectedLink] = useState("");

  return (
    <nav className="fixed xl:z-0 bottom-0 left-0 right-0 flex flex-row justify-around text-black dark:bg-[#000] xl:border-y-0 xl:flex-col xl:top-0 xl:left-0 xl:relative shadow-mobile xl:shadow-none xl:w-[196px] bg-white">
      <Link
        to="/index"
        className="flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark "
        onClick={() => setSelectedLink("/index")}
      >
        {selectedLink === "/index" ? (
          <ILocalHomeSelected fill={textColorSelected} />
        ) : (
          <ILocalHome fill={textColor} />
        )}
        <p
          className={`hidden xl:block text-sm font-medium text-center  ${
            selectedLink === "/index"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          Home
        </p>
      </Link>
      <Link
        to="/index"
        className="flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
        onClick={() => setSelectedLink("/forum")}
      >
        {selectedLink === "/forum" ? (
          <ILocalForumSelected fill={textColorSelected} />
        ) : (
          <ILocalForum fill={textColor} />
        )}
        <p
          className={`hidden xl:block text-sm font-medium text-center  ${
            selectedLink === "/forum"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          Forum
        </p>
      </Link>
      <Link
        to="/index"
        className="flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
        onClick={() => setSelectedLink("/notification")}
      >
        {selectedLink === "/notification" ? (
          <ILocalNotificationSelected fill={textColorSelected} />
        ) : (
          <ILocalNotification fill={textColor} />
        )}
        <p
          className={`hidden xl:block text-sm font-medium text-center  ${
            selectedLink === "/notification"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          Notification
        </p>
      </Link>
      <Link
        to="/index"
        className="flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
        onClick={() => setSelectedLink("/mess")}
      >
        {selectedLink === "/mess" ? (
          <ILocalMessSelected fill={textColorSelected} />
        ) : (
          <ILocalMess fill={textColor} />
        )}
        <p
          className={`hidden xl:block text-sm font-medium text-center  ${
            selectedLink === "/mess"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          {" "}
          Message
        </p>
      </Link>
      <Link
        to="/index"
        className="hidden xl:flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
        onClick={() => setSelectedLink("/bookmark")}
      >
        {selectedLink === "/bookmark" ? (
          <ILocalBookmarkSelected fill={textColorSelected} />
        ) : (
          <ILocalBookmark fill={textColor} />
        )}
        <p
          className={` text-sm font-medium text-center  ${
            selectedLink === "/bookmark"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          Bookmark
        </p>
      </Link>
      <Link
        to="/index"
        className="flex items-center flex-shrink-0 gap-4 h-14 xl:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
        onClick={() => setSelectedLink("/profile")}
      >
        {selectedLink === "/profile" ? (
          <ILocalProfileSelected fill={textColorSelected} />
        ) : (
          <ILocalProfile fill={textColor} />
        )}
        <p
          className={`hidden xl:block text-sm font-medium text-center  ${
            selectedLink === "/profile"
              ? "text-[#A73574] dark:text-[#FFAFD5]"
              : "text-[#1F1A1C] dark:text-[#CEC4C6]"
          } font-roboto`}
        >
          Profile
        </p>
      </Link>
    </nav>
  );
};

export default Menu;
