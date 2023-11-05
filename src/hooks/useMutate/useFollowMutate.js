import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFollowApi,
  getFollowApi,
  getUnfollowApi,
  unFollowApi,
} from "../../api/follow";
import { useParams } from "react-router-dom";
function useFollowMutate() {
  const queryClient = useQueryClient();
  const { profileId } = useParams();
  const { mutate: getFollow } = useMutation({
    mutationFn: getFollowApi,
    onSuccess: (respone) => {
      if (respone.result) {
        queryClient.invalidateQueries(["listPostAccountFollowing"]);
        queryClient.invalidateQueries(["listPostExpertFollowing"]);
        queryClient.invalidateQueries(["listFollowing"]);
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  const { mutate: getUnfollow } = useMutation({
    mutationFn: getUnfollowApi,
    onSuccess: (respone) => {
      if (respone.result) {
        queryClient.invalidateQueries(["listPostAccountFollowing"]);
        queryClient.invalidateQueries(["listPostExpertFollowing"]);
        queryClient.invalidateQueries(["listFollowing"]);
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
