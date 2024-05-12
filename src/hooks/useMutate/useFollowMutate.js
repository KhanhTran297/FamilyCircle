import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFollowApi,
  getFollowApi,
  getUnfollowApi,
  unFollowApi,
} from "../../api/follow";
import { useParams } from "react-router-dom";
import { message } from "antd";
function useFollowMutate() {
  const queryClient = useQueryClient();
  const { profileId } = useParams();
  const { mutateAsync: getFollow } = useMutation({
    mutationFn: getFollowApi,
    onSuccess: (respone) => {
      if (respone.result) {
        queryClient.invalidateQueries(["GetListPostHome"]);
        queryClient.invalidateQueries(["listFollowing"]);
        message.success("Follow success!");
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  const { mutateAsync: getUnfollow } = useMutation({
    mutationFn: getUnfollowApi,
    onSuccess: (respone) => {
      if (respone.result) {
        queryClient.invalidateQueries(["GetListPostHome"]);
        queryClient.invalidateQueries(["listFollowing"]);
        message.success("Follow unsuccess!");
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  const { mutateAsync: createFollow } = useMutation({
    mutationFn: createFollowApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["listFollowingById", profileId]);
      queryClient.invalidateQueries(["listFollowerById", profileId]);
    },
  });
  const { mutateAsync: unFollow } = useMutation({
    mutationFn: unFollowApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["listFollowingById", profileId]);
      queryClient.invalidateQueries(["listFollowerById", profileId]);
    },
  });
  return {
    unFollow,
    getFollow,
    getUnfollow,
    createFollow,
  };
}
export default useFollowMutate;
