import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";
import useNotificationMutate from "../../hooks/useMutate/useNotificationMutate";
import { useSearchParams } from "react-router-dom";
import NotificationList from "../../components/notification/NotificationList";
const NotificationPage2 = (props) => {
  const { readAllNotification, deleteAllNotification } =
    useNotificationMutate();
  const [tab, setTab] = useState({ state: 0 });
  const queryClient = useQueryClient();
  let [searchParams, setSearchParams] = useSearchParams();
  const handleChangeTab = (tab) => {
    setTab({ state: tab });
    setSearchParams({ state: tab });
  };
  const handleReadAllNotification = () => {
    readAllNotification().then((res) => {
      queryClient.invalidateQueries(["listNotification"]);
    });
  };
  const handleDeleteAllNotification = () => {
    deleteAllNotification().then((res) => {
      queryClient.invalidateQueries(["listNotification"]);
    });
  };
  return (
    <div className="flex flex-col gap-6 mt-4 ">
      <div className="flex flex-row items-center justify-between ">
        <p className="text-3xl font-medium font-roboto">Notifications</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 justify-between border-b border-[#ccc] ">
          <div className="flex flex-row gap-2 ">
            <div
              className="pb-2 border-b "
              style={tab.state === 0 ? { borderColor: "#a73574" } : {}}
            >
              <p
                className=" font-roboto font-normal  text-base cursor-pointer hover:text-[#a73574]"
                style={tab.state === 0 ? { color: "#a73574" } : {}}
                onClick={() => handleChangeTab(0)}
              >
                Unread
              </p>
            </div>
            <div className=" w-[1px] mb-2  border border-[#ccc]"></div>
            <div
              className="pb-2 border-b "
              style={tab.state === 1 ? { borderColor: "#a73574" } : {}}
            >
              <p
                className=" font-roboto font-normal  text-base cursor-pointer hover:text-[#a73574]"
                style={tab.state === 1 ? { color: "#a73574" } : {}}
                onClick={() => handleChangeTab(1)}
              >
                Read
              </p>
            </div>
            <div className=" w-[1px] mb-2  border border-[#ccc]"></div>
            <div
              className="pb-2 border-b "
              style={tab.state === 2 ? { borderColor: "#a73574" } : {}}
            >
              <p
                className=" font-roboto font-normal  text-base cursor-pointer hover:text-[#a73574]"
                style={tab.state === 2 ? { color: "#a73574" } : {}}
                onClick={() => handleChangeTab(2)}
              >
                All
              </p>
            </div>
          </div>
          <div className=" flex flex-row gap-2">
            <div className="flex justify-center items-center">
              <p
                className=" font-roboto text-red-400 hover:text-red-500 cursor-pointer text-base"
                onClick={() => handleDeleteAllNotification()}
              >
                Delete all
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p
                className=" font-roboto hover:opacity-50 cursor-pointer text-base"
                onClick={() => handleReadAllNotification()}
              >
                Mark all as read
              </p>
            </div>
          </div>
        </div>
        <NotificationList tab={tab} />
      </div>
    </div>
  );
};

NotificationPage2.propTypes = {};

export default NotificationPage2;
