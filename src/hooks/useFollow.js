import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getFollowApi,
  getListFollowingApi,
  getUnfollowApi,
} from "../api/follow";
import UsePost from "./UsePost";

function useFollow() {
  const { getListPostAccountFollowing, getListPostExpertFollowing } = UsePost();
  const { data: listFollowing, refetch: getListFollowing } = useQuery({
    queryKey: ["listFollowing"],
    queryFn: getListFollowingApi,
  });

  const { mutate: getFollow } = useMutation({
    mutationFn: getFollowApi,
    onSuccess: (respone) => {
      if (respone.result) {
        getListFollowing();
        getListPostAccountFollowing();
        getListPostExpertFollowing();
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
        getListFollowing();
        getListPostAccountFollowing();
        getListPostExpertFollowing();
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });

  return {
    listFollowing,
    getListFollowing,
    getFollow,
    getUnfollow,
  };
}
export default useFollow;
