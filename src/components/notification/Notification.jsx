import React, { useEffect, useState } from "react";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import { useParams } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getListfollowingByIdApi } from "../../api/follow";
import { getPostByIdApi } from "../../api/post";
import useNotificationSocket from "../../hooks/useNotificationSocket";
import useAccount from "../../hooks/useAccount";
import useNotificationMutate from "../../hooks/useMutate/useNotificationMutate";
import { getListNotificationApi } from "../../api/notification";
import { getAccountClientApi } from "../../api/account";
import NotificationCard from "./NotificationCard";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setListNotification } from "../../redux/slice/notification";

const Notification = () => {
  const { accountProfile } = useAccount();
  const accountId = accountProfile?.data?.id;
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState([]);
  const [postId, setPostId] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const dispatch = useDispatch();
  const listNotifications = useSelector(
    (state) => state.notification.listNotification,
    shallowEqual
  );
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
    queryFn: getListNotificationApi,
    enabled: true,
  });
  useEffect(() => {
    dispatch(setListNotification(notifications));
  }, [dispatch, notifications]);
  useEffect(() => {
    if (
      listNotification &&
      listNotification.data &&
      listNotification.data.content
    ) {
      const createdByEmail = listNotification.data.content.map(
        (notification) => notification.createdBy
      );
      setUserEmail(createdByEmail);
    }
  }, [listNotification]);
  const { data: listAccountClient } = useQuery({
    queryKey: ["listAccountClent"],
    queryFn: getAccountClientApi,
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
      const updatedNotifications = listNotification.data.content.map(
        (notification) => {
          const user = usersData.find(
            (u) => u.email === notification.createdBy
          );

          return {
            id: notification.id,
            objectId: notification.objectId,
            content: notification.content,
            fullName: user?.fullName,
            avatar: user?.avatar,
            createdDate: notification.createdDate,
          };
        }
      );

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
      {listNotifications.map((notification, index) => (
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
