// src/components/Menu.js
// import React from "react";
import { ILocalHome } from "../svg/home";
import { ILocalNotification } from "../svg/notification";
import { ILocalMess } from "../svg/mess";
import { ILocalBookmark } from "../svg/bookmark";
import { ILocalProfile } from "../svg/profile";
import useTheme from "../../hooks/useTheme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ILocalHomeSelected } from "../svg/home_selected";
import { ILocalNotificationSelected } from "../svg/noti_selected";
import { ILocalMessSelected } from "../svg/mess_selected";
import { ILocalBookmarkSelected } from "../svg/bookmark_selected";
import { ILocalProfileSelected } from "../svg/profile_selected";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import { TeamOutlined } from "@ant-design/icons";
import CommentForm from "../comment/CommentForm";
import { useQuery } from "@tanstack/react-query";
import { getListMyNotificationApi } from "../../api/notification";
import { Badge } from "antd";
import { ILocalCalender } from "../svg/calender";
import { ILocalBaby } from "../svg/baby";
import { ILocalMom } from "../svg/mom";

const Menu = () => {
  const accountprofile = useGetFetchQuery(["accountProfile"]);
  const { theme } = useTheme({});
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const textColorSelected = theme === "dark" ? "#FFAFD5" : "#A73574";
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { profileId } = useParams();
  const handleRouter = (path) => {
    navigate(path);
  };
  const { data: listNotification } = useQuery({
    queryKey: ["listNotification", "menu"],
    queryFn: () =>
      getListMyNotificationApi({ state: 0 }).then((res) => res?.data),
  });

  const params = useParams();
  return (
    <nav className="xl:h-[615px] fixed desktop:z-0 bottom-0 left-0 right-0 flex flex-col text-black dark:bg-[#000] desktop:border-y-0 desktop:flex-col desktop:top-0 desktop:left-0 desktop:relative shadow-mobile desktop:shadow-none desktop:w-[196px] bg-white">
      {params.id !== undefined && (
        <div className="px-2 pt-3 xl:hidden xl:px-0 xl:pt-0">
          <CommentForm id={params.id} parentId={""} />
        </div>
      )}
      <div className="bottom-0 left-0 right-0 flex flex-row justify-around xl:flex-col">
        <button
          className="flex items-center flex-shrink-0 cursor-pointer gap-4 h-14 desktop:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark "
          onClick={() => handleRouter("/index")}
        >
          {path === "/index" ? (
            <ILocalHomeSelected fill={textColorSelected} />
          ) : (
            <ILocalHome fill={textColor} />
          )}
          <p
            className={`hidden desktop:block text-sm font-medium text-center  ${
              path === "/index"
                ? "text-[#A73574] dark:text-[#FFAFD5]"
                : "text-[#1F1A1C] dark:text-[#CEC4C6]"
            } font-roboto`}
          >
            Home
          </p>
        </button>
        <button
          className="flex items-center flex-shrink-0 cursor-pointer gap-4 h-14 desktop:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark "
          onClick={() => handleRouter("/community")}
        >
          {path === "/community" ? (
            <TeamOutlined
              style={{ fontSize: "24px", color: `${textColorSelected}` }}
            />
          ) : (
            <>
              {/* <ILocalHome fill={textColor} /> */}
              <TeamOutlined
                style={{ fontSize: "24px", color: `${textColor}` }}
              />
            </>
          )}
          <p
            className={`hidden desktop:block text-sm font-medium text-center  ${
              path === "/community"
                ? "text-[#A73574] dark:text-[#FFAFD5]"
                : "text-[#1F1A1C] dark:text-[#CEC4C6]"
            } font-roboto`}
          >
            Community
          </p>
        </button>
        <button
          className="flex items-center flex-shrink-0 cursor-pointer gap-4 h-14 desktop:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
          onClick={() => handleRouter("/notification")}
        >
          <Badge count={listNotification?.totalElements} offset={[0, 0]}>
            {path === "/notification" ? (
              <ILocalNotificationSelected
                fill={textColorSelected}
                check={listNotification?.totalElements > 0 ? true : false}
              />
            ) : (
              <ILocalNotification
                fill={textColor}
                check={listNotification?.totalElements > 0 ? true : false}
              />
            )}
          </Badge>
          <p
            className={`hidden desktop:block text-sm font-medium text-center  ${
              path === "/notification"
                ? "text-[#A73574] dark:text-[#FFAFD5]"
                : "text-[#1F1A1C] dark:text-[#CEC4C6]"
            } font-roboto`}
          >
            Notification
          </p>
        </button>
        <button
          className="flex items-center flex-shrink-0 cursor-pointer gap-4 h-14 desktop:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
          onClick={() => handleRouter("/message")}
        >
          {path === "/message" ? (
            <ILocalMessSelected fill={textColorSelected} />
          ) : (
            <ILocalMess fill={textColor} />
          )}
          <p
            className={`hidden desktop:block text-sm font-medium text-center  ${
              path === "/message"
                ? "text-[#A73574] dark:text-[#FFAFD5]"
                : "text-[#1F1A1C] dark:text-[#CEC4C6]"
            } font-roboto`}
          >
            {" "}
            Message
          </p>
        </button>
        <button
          className="hidden desktop:flex items-center cursor-pointer flex-shrink-0 gap-4 h-14 desktop:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
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
        </button>
        <button
          className="flex items-center flex-shrink-0 cursor-pointer gap-4 h-14 desktop:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
          onClick={() => handleRouter(`/profile/${accountprofile?.data?.id}`)}
        >
          {path === `/profile/${profileId}` ? (
            <ILocalProfileSelected fill={textColorSelected} />
          ) : (
            <ILocalProfile fill={textColor} />
          )}
          <p
            className={`hidden desktop:block text-sm font-medium text-center  ${
              profileId
                ? "text-[#A73574] dark:text-[#FFAFD5]"
                : "text-[#1F1A1C] dark:text-[#CEC4C6]"
            } font-roboto`}
          >
            Profile
          </p>
        </button>
        <button
          className="hidden desktop:flex items-center cursor-pointer flex-shrink-0 gap-4 h-14 desktop:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
          onClick={() => handleRouter("/babyhealth")}
        >
          {path === "/babyhealth" ? (
            <ILocalBaby fill={textColorSelected} />
          ) : (
            <ILocalBaby fill={textColor} />
          )}
          <p
            className={` text-sm font-medium text-center  ${
              path === "/babyhealth"
                ? "text-[#A73574] dark:text-[#FFAFD5]"
                : "text-[#1F1A1C] dark:text-[#CEC4C6]"
            } font-roboto`}
          >
            Baby's Health
          </p>
        </button>
        <button
          className="hidden desktop:flex items-center cursor-pointer flex-shrink-0 gap-4 h-14 desktop:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
          onClick={() => handleRouter("/motherhealth")}
        >
          {path === "/motherhealth" ? (
            <ILocalMom fill={textColorSelected} />
          ) : (
            <ILocalMom fill={textColor} />
          )}
          <p
            className={` text-sm font-medium text-center  ${
              path === "/motherhealth"
                ? "text-[#A73574] dark:text-[#FFAFD5]"
                : "text-[#1F1A1C] dark:text-[#CEC4C6]"
            } font-roboto`}
          >
            Mother's Health
          </p>
        </button>
        <button
          className="hidden desktop:flex items-center cursor-pointer flex-shrink-0 gap-4 h-14 desktop:h-[48px] px-4 hover:bg-menu dark:hover:bg-buttonHoverDark"
          onClick={() => handleRouter("/schedule")}
        >
          {path === "/schedule" ? (
            <ILocalCalender fill={textColorSelected} />
          ) : (
            <ILocalCalender fill={textColor} />
          )}
          <p
            className={` text-sm font-medium text-center  ${
              path === "/schedule"
                ? "text-[#A73574] dark:text-[#FFAFD5]"
                : "text-[#1F1A1C] dark:text-[#CEC4C6]"
            } font-roboto`}
          >
            Schedule
          </p>
        </button>
      </div>
    </nav>
  );
};

export default Menu;
