import { useState } from "react";
import PropTypes from "prop-types";
import { getListMyNotificationApi } from "../../api/notification";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NotificationCard2 from "./NotificationCard2";
import LoadingPage from "../shared/LoadingPage";
import NotificationEmptyState from "./NotificationEmptyState";
import useNotificationMutate from "../../hooks/useMutate/useNotificationMutate";

const NotificationDropDown = (props) => {
  const { readAllNotification, deleteAllNotification } =
    useNotificationMutate();
  const [tab, setTab] = useState(1);
  const queryClient = useQueryClient();
  const [listNotificationState, setListNotificationState] = useState([]);
  const {
    data: listAllNotification,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["listNotification", "all"],
    queryFn: () =>
      getListMyNotificationApi(tab === 0 && { state: 0 }).then((res) => {
        res?.data?.totalElements > 0
          ? setListNotificationState(res?.data?.content)
          : setListNotificationState([]);
        return res?.data;
      }),
  });
  const handleReadAllNotification = async () => {
    readAllNotification().then((res) => {
      queryClient.invalidateQueries(["listNotification", "menu"]);

      setListNotificationState((prev) =>
        tab === 0
          ? (prev = [])
          : prev.map((item) => {
              return { ...item, state: 1 };
            })
      );
    });
  };

  const handleDeleteAllNotification = () => {
    deleteAllNotification().then((res) => {
      setListNotificationState((prev) => (prev = []));
      queryClient.invalidateQueries(["listNotification", "menu"]);
    });
  };

  const handleChangeTab = async (tab) => {
    setTab(tab);
  };
  return (
    <div className="flex flex-col gap-2 h-full max-h-full overflow-y-scroll">
      <div className=" flex flex-row justify-between border-b border-b-[#ccc]">
        <div className="flex flex-row gap-2">
          <div
            className="flex items-center  border-b"
            style={tab === 1 ? { borderColor: "#a73574" } : {}}
          >
            <p
              className=" font-roboto  font-normal  text-base cursor-pointer hover:text-[#a73574]"
              style={tab === 1 ? { color: "#a73574" } : {}}
              onClick={(e) => {
                handleChangeTab(1).then(() => refetch());
              }}
            >
              All
            </p>
          </div>
          <div
            className="flex items-center  border-b"
            style={tab === 0 ? { borderColor: "#a73574" } : {}}
          >
            <p
              className=" font-roboto font-normal text-base cursor-pointer hover:text-[#a73574]"
              style={tab === 0 ? { color: "#a73574" } : {}}
              onClick={(e) => {
                handleChangeTab(0).then(() => refetch());
              }}
            >
              Unread
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex items-center">
            <p
              className=" font-roboto text-base cursor-pointer hover:text-[#a73574]"
              onClick={() => handleReadAllNotification()}
            >
              Read all
            </p>
          </div>
          <div className=" flex items-center">
            <p
              className=" font-roboto text-base cursor-pointer hover:text-red-600 text-red-500"
              onClick={() => handleDeleteAllNotification()}
            >
              Delete all
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {loading === true ? (
          <LoadingPage css=" h-screen flex justify-center items-center" />
        ) : listNotificationState?.length === 0 ? (
          <NotificationEmptyState css="w-[100px] h-[100px]" />
        ) : (
          listNotificationState?.map((item) => {
            return (
              <NotificationCard2
                key={item.id}
                event={item}
                kind={2}
                //   readNotification={handleReadNotification}
                //   deleteNotification={handleDeleteNotification}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

NotificationDropDown.propTypes = {};

export default NotificationDropDown;
