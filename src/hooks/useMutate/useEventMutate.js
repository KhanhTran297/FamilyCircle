import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveEventApi,
  createEventApi,
  deleteEventApi,
  editEventApi,
  rejectEventApi,
} from "../../api/event";
import { message } from "antd";

function useEventMutate() {
  const queryClient = useQueryClient();
  const { mutateAsync: createEvent } = useMutation({
    mutationKey: ["createEvent"],
    mutationFn: createEventApi,
    onSuccess: () => {
      message.success("Create event success");
    },
  });
  const { mutateAsync: approveEvent, isLoading: loadingApprove } = useMutation({
    mutationKey: ["approveEvent"],
    mutationFn: approveEventApi,
    onSuccess: () => {
      message.success("Approve event success");
    },
  });
  const { mutateAsync: deleteEvent } = useMutation({
    mutationKey: ["deleteEvent"],
    mutationFn: deleteEventApi,
    onSuccess: () => {
      message.success("Delete event success");
    },
  });
  const { mutateAsync: rejectEvent } = useMutation({
    mutationKey: ["rejectEvent"],
    mutationFn: rejectEventApi,
    onSuccess: () => {
      message.success("Reject event success");
    },
  });
  const { mutateAsync: editEvent } = useMutation({
    mutationKey: ["editEvent"],
    mutationFn: editEventApi,
    onSuccess: () => {
      message.success("Edit event success");
    },
  });
  return {
    createEvent,
    approveEvent,
    loadingApprove,
    deleteEvent,
    rejectEvent,
    editEvent,
  };
}
export default useEventMutate;
