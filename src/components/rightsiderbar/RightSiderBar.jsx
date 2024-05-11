import { useQuery } from "@tanstack/react-query";
import { ILocalNotification } from "../svg/notification";
import Community from "./Community";
import SearchingUsers from "./SearchingUsers";
import { Badge } from "antd";
import { getListMyNotificationApi } from "../../api/notification";
import React, { useState } from "react";
import NotificationDropDown from "../notification/NotificationDropDown";
const RightSiderBar = () => {
  const [active, setActive] = useState(false);
  const { data: listNotification } = useQuery({
    queryKey: ["listNotification", "menu"],
    queryFn: () =>
      getListMyNotificationApi({ state: 0 }).then((res) => res?.data),
  });

  return (
    <div className="desktop:top-0 desktop:right-0 desktop:sticky xl:block desktop:w-full desktop:h-[100vh] hidden ">
      <div className="flex-col  gap-6 py-6 justify-center  desktop:flex">
        <div className="flex flex-row gap-2 w-full">
          <div className=""></div>
          <SearchingUsers />
          <div className="flex items-center relative cursor-pointer">
            <Badge count={listNotification?.totalElements}>
              <div
                className=""
                onClick={() => setActive((prev) => (prev = !prev))}
              >
                {" "}
                <ILocalNotification fill="black" />
              </div>
            </Badge>
            <div
              className={` w-[350px] h-[400px] bg-white absolute right-0 top-0 translate-x-[20px] translate-y-[40px] ${
                !active && "hidden"
              } shadow-2xl z-50 rounded-xl px-2 py-2 `}
            >
              <NotificationDropDown />
            </div>
          </div>
        </div>

        <Community />
      </div>
    </div>
  );
};

export default RightSiderBar;
