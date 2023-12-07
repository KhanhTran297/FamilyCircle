import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAnnounceApi,
  createNotificationApi,
} from "../../api/notification";

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
  return { createNotification, createAnnounce };
}
export default useNotificationMutate;
