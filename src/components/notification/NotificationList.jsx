import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  deleteNotificationApi,
  getListMyNotificationApi,
  readNotificationApi,
} from "../../api/notification";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import NotificationEmptyState from "./NotificationEmptyState";
import NotificationCard2 from "./NotificationCard2";
import LoadingPage from "../shared/LoadingPage";

const NotificationList = (props) => {
  const [listNotificationState, setListNotificationState] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { data: listNotification, isLoading: loading } = useQuery({
    queryKey: ["listNotification", searchParams.get("state")],
    queryFn: () =>
      getListMyNotificationApi(
        searchParams.get("state") === null
          ? { state: 0 }
          : searchParams.get("state") !== "2" && {
              state: searchParams.get("state"),
            }
      ).then((res) => {
        // console.log("res", res?.data?.totalElements);
        // res?.data?.totalElements > 0
        //   ? setListNotificationState(res?.data?.content)
        //   : setListNotificationState([]);

        return res?.data;
      }),
  });
  const handleDeleteNotification = (id) => {
    deleteNotificationApi({ id: id }).then((res) => {
      setListNotificationState((prev) => prev.filter((item) => item.id !== id));
      queryClient.invalidateQueries(["listNotification", "menu"]);
    });
  };
  const handleReadNotification = (id) => {
    readNotificationApi({ id: id }).then((res) => {
      setListNotificationState((prev) =>
        props.tab.state === 0
          ? prev.filter((item) => item.id !== id)
          : prev.map((item) => {
              if (item.id === id) {
                return { ...item, state: 1 };
              }
              return item;
            })
      );
      queryClient.invalidateQueries(["listNotification", "menu"]);
    });
  };
  useEffect(() => {
    listNotification?.totalElements > 0
      ? setListNotificationState(listNotification?.content)
      : setListNotificationState([]);
  }, [listNotification]);
  return (
    <div className="flex flex-col gap-3">
      {loading === true ? (
        <LoadingPage css=" h-screen flex justify-center items-center" />
      ) : listNotificationState?.length === 0 ? (
        <NotificationEmptyState css="w-[350px] h-[350px]" />
      ) : (
        listNotificationState?.map((item) => {
          return (
            <NotificationCard2
              key={item.id}
              event={item}
              kind={1}
              readNotification={handleReadNotification}
              deleteNotification={handleDeleteNotification}
            />
          );
        })
      )}
    </div>
  );
};
NotificationList.propTypes = {
  queryParam: PropTypes.string,
  tab: PropTypes.object,
};
export default NotificationList;
