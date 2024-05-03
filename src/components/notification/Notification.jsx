import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getListfollowingByIdApi } from "../../api/follow";
import { getPostByIdApi } from "../../api/post";
import useNotificationSocket from "../../hooks/useNotificationSocket";
import useAccount from "../../hooks/useAccount";
import { getListNotificationApi } from "../../api/notification";
import { getAccountClientApi2 } from "../../api/account";
import NotificationCard from "./NotificationCard";

const Notification = () => {
  const { accountProfile } = useAccount();
  const accountId = accountProfile?.data?.id;
  const [notifications, setNotifications] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [socketNotification, setSocketNotification] = useState(null);
  const { data: listFollowing } = useQuery({
    queryKey: ["listFollowingById", accountId],
    queryFn: getListfollowingByIdApi,
  });
  const { data: listOwnPost } = useQuery({
    queryKey: ["listOwnPost", accountId],
    queryFn: () => getPostByIdApi(accountId),
  });
  const socket = useNotificationSocket();

  const { data: listNotification } = useQuery({
    queryKey: ["listNotification"],
    queryFn: () => getListNotificationApi().then((res) => res?.data),
    enabled: true,
  });
  console.log(listNotification);
  useEffect(() => {
    if (listNotification.length > 0) {
      const createdByEmail = listNotification.map(
        (notification) => notification.createdBy
      );
      setUserEmail(createdByEmail);
    }
  }, [listNotification]);
  const { data: listAccountClient } = useQuery({
    queryKey: ["listAccountClent"],
    queryFn: () => getAccountClientApi2().then((res) => res),
  });
  useEffect(() => {
    if (
      listAccountClient &&
      listAccountClient.data &&
      listAccountClient.data.content &&
      userEmail
    ) {
      const filteredUsers = listAccountClient.data.content.filter((user) =>
        userEmail.includes(user.email)
      );

      setUsersData(filteredUsers);
    }
  }, [listAccountClient, userEmail]);
  useEffect(() => {
    if (usersData.length > 0 && listNotification) {
      const updatedNotifications = listNotification.map((notification) => {
        const user = usersData.find((u) => u.email === notification.createdBy);

        return {
          id: notification.id,
          objectId: notification.objectId,
          content: notification.content,
          fullName: user?.fullName,
          avatar: user?.avatar,
          createdDate: notification.createdDate,
        };
      });

      setNotifications(updatedNotifications);
    }
  }, [usersData, listNotification]);
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

  useEffect(() => {
    if (socket) {
      socket.on("get-notification-new-follower", (data) => {
        if (data.kind === 5) {
          setSocketNotification({
            id: data.id,
            objectId: data.accountId,
            content: data.content,
            fullName: data.fullname,
            avatar: data.avatar,
            createdDate: data.createdDate,
          });
        }
      });
      socket.on("get-notification-new-reaction-post", (data) => {
        if (data.kind === 3) {
          setSocketNotification({
            id: data.id,
            objectId: data.postId,
            content: data.content,
            fullName: data.fullname,
            avatar: data.avatar,
            createdDate: data.createdDate,
          });
        }
      });
      return () => {
        socket.off("get-notification-new-follower");
        socket.off("get-notification-new-reaction-post");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socketNotification) {
      const user = usersData.find(
        (u) => u.email === socketNotification.createdBy
      );
      setNotifications((prevNotifications) => {
        const isExisting = prevNotifications.some(
          (notification) => notification.id === socketNotification.id
        );

        if (!isExisting) {
          const updatedNotification = {
            ...socketNotification,
            fullName: user?.fullName || socketNotification.fullName,
            avatar: user?.avatar || socketNotification.avatar,
          };

          return [updatedNotification, ...prevNotifications];
        }

        return prevNotifications;
      });
    }
  }, [socketNotification, usersData]);

  return (
    <div>
      {notifications.map((notification, index) => (
        <NotificationCard
          id={notification.id}
          objectId={notification.id}
          content={notification.content}
          fullName={notification.fullName}
          avatar={notification.avatar}
          key={index}
          createdDate={notification.createdDate}
        />
      ))}
    </div>
  );
};

export default Notification;
