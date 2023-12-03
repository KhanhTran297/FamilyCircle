import React, { useEffect, useState } from "react";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getListfollowingByIdApi } from "../../api/follow";
import { getPostByIdApi } from "../../api/post";
import useNotificationSocket from "../../hooks/useNotificationSocket";
import useAccount from "../../hooks/useAccount";

const Notification = () => {
  const { accountProfile } = useAccount();
  const accountId = accountProfile?.data?.id;
  const [user, setUser] = useState("");
  const { data: listFollowing } = useQuery({
    queryKey: ["listFollowingById", accountId],
    queryFn: getListfollowingByIdApi,
  });
  const { data: listOwnPost } = useQuery({
    queryKey: ["listOwnPost", accountId],
    queryFn: () => getPostByIdApi(accountId),
  });
  const socket = useNotificationSocket();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const newPostOfFollowingNotificationRooms =
      listFollowing?.data?.content?.map((following) => following.account.id);
    const myPostNotificationRooms = listOwnPost?.data?.content?.map(
      (post) => post.id
    );

    if (
      socket &&
      newPostOfFollowingNotificationRooms &&
      myPostNotificationRooms
    ) {
      socket.emit("join-notification-room", {
        myPostNotificationRooms,
        newPostOfFollowingNotificationRooms,
      });
    }
  }, [listFollowing, listOwnPost, socket]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("get-notification-new-follower", (data) => {
  //       // setNotifications((prevNotifications) => [...prevNotifications, data]);
  //       console.log(data);
  //     });
  //     return () => {
  //       socket.off("get-notification-new-follower");
  //     };
  //   }
  // }, [socket]);
  return <div></div>;
};

export default Notification;
