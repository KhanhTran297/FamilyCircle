import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { createFollowApi } from "../api/follow";

function useFollow(id) {
  const { mutateAsync: createFollow } = useMutation({
    mutationFn: createFollowApi,

    onSuccess: () => {
      message.success("Follow successfully");
    },
  });

  return {
    createFollow,
  };
}
export default useFollow;
