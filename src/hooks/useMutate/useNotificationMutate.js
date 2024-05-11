import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAnnounceApi,
  createNotificationApi,
  deleteAllNotificationApi,
  deleteNotificationApi,
  pushNotificationApi,
  readAllNotificationApi,
  readNotificationApi,
} from "../../api/notification";
import { message } from "antd";

function useNotificationMutate() {
  const queryClient = useQueryClient();
  const { mutateAsync: createNotification } = useMutation({
    mutationKey: ["createNotification"],
    mutationFn: createNotificationApi,
    onSuccess: (respone) => {
      if (respone.result) {
        queryClient.invalidateQueries(["listNotification"]);
      } else {
        // useError("Create notification fail!");
      }
    },
    onError: (error) => {
      console.error("Error creating notification:", error);
    },
  });
  const { mutateAsync: createAnnounce } = useMutation({
    mutationKey: ["createAnnounce"],
    mutationFn: createAnnounceApi,

    onError: (error) => {
      console.error("Error creating announce:", error);
    },
  });
  const { mutateAsync: readNotification } = useMutation({
    mutationKey: ["readNotification"],
    mutationFn: readNotificationApi,
    onSuccess: () => {
      // queryClient.invalidateQueries(["listNotification"]);
      message.success("Read notification success");
    },
    onError: (error) => {
      console.error("Error read notification:", error);
    },
  });
  const { mutateAsync: deleteNotification } = useMutation({
    mutationKey: ["deleteNotification"],
    mutationFn: deleteNotificationApi,
    onSuccess: () => {
      message.success("Delete notification success");
    },
    onError: (error) => {
      console.error("Error delete notification:", error);
    },
  });
  const { mutateAsync: deleteAllNotification } = useMutation({
    mutationKey: ["deleteAllNotification"],
    mutationFn: deleteAllNotificationApi,
    onSuccess: () => {
      message.success("Delete all notification success");
    },
    onError: (error) => {
      console.error("Error delete all notification:", error);
    },
  });
  const { mutateAsync: readAllNotification } = useMutation({
    mutationKey: ["readAllNotification"],
    mutationFn: readAllNotificationApi,
    onSuccess: () => {
      message.success("Read all notification success");
    },
    onError: (error) => {
      console.error("Error read all notification:", error);
    },
  });
  const { mutateAsync: pushNotification } = useMutation({
    mutationKey: ["pushNotification"],
    mutationFn: pushNotificationApi,
    onSuccess: () => {
      message.success("Push notification success");
    },
    onError: (error) => {
      console.error("Error push notification:", error);
    },
  });
  return {
    createNotification,
    createAnnounce,
    readNotification,
    deleteNotification,
    deleteAllNotification,
    readAllNotification,
    pushNotification,
  };
}
export default useNotificationMutate;
