import { useQuery } from "@tanstack/react-query";
import Community from "./Community";
import { Badge, Input } from "antd";
import { getListMyNotificationApi } from "../../api/notification";
import React, { useEffect, useState } from "react";
import NotificationDropDown from "../notification/NotificationDropDown";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchParamsRedux } from "../../redux/slice/search";
import "./rightSiderBar.css";
import BellButton from "../shared/BellButton";
const RightSiderBar = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams("");
  const dispatch = useDispatch();
  const { data: listNotification } = useQuery({
    queryKey: ["listNotification", "menu"],
    queryFn: () =>
      getListMyNotificationApi({ state: 0 }).then((res) => res?.data),
  });
  const { Search } = Input;
  const onSearch = (value) => {
    dispatch(setSearchParamsRedux({ search: value }));
    setSearchParams({ search: value });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");
    dispatch(setSearchParamsRedux({ search: searchValue }));
  }, [location.search]);
  return (
    <div className="desktop:top-0 desktop:right-0 desktop:sticky xl:block desktop:w-full desktop:h-[100vh] hidden ">
      <div className="flex-col justify-center gap-6 py-6 desktop:flex">
        <div className="flex flex-row w-full gap-2">
          <div className=""></div>
          {/* <SearchingUsers /> */}
          {/* <Search
            placeholder="input search text"
            defaultValue={defaultValues}
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          /> */}
          <div className="input-container">
            <input
              type="text"
              name="text"
              className="input"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch(e.target.value);
                }
              }}
              placeholder="Search something..."
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill=""
              viewBox="0 0 24 24"
              className="icon"
            >
              <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <rect fill="white" height="24" width="24"></rect>{" "}
                <path
                  fill=""
                  d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="relative flex items-center cursor-pointer">
            <Badge count={listNotification?.totalElements}>
              <div
                className=""
                onClick={() => setActive((prev) => (prev = !prev))}
              >
                <BellButton />
              </div>
            </Badge>
            <div
              className={` w-[350px] h-[400px] bg-white absolute right-0 top-0 translate-x-[70%] translate-y-[50px] ${
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
