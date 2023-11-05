import { useQuery } from "@tanstack/react-query";
import { getListFollowingApi } from "../api/follow";

function useFollow(id) {
  // const { getListPostAccountFollowing, getListPostExpertFollowing } = UsePost();
  const { data: listFollowing, refetch: getListFollowing } = useQuery({
    queryKey: ["listFollowing"],
    queryFn: getListFollowingApi,
  });

  // const { mutate: getFollow } = useMutation({
  //   mutationFn: getFollowApi,
  //   onSuccess: (respone) => {
  //     if (respone.result) {
  //       getListFollowing();
  //       getListPostAccountFollowing();
  //       getListPostExpertFollowing();
  //     } else {
  //       // useError("Create post fail!");
  //     }
  //   },
  //   onError: () => {
  //     // useError("Save fail!!!!");
  //   },
  // });
  // const { mutate: getUnfollow } = useMutation({
  //   mutationFn: getUnfollowApi,
  //   onSuccess: (respone) => {
  //     if (respone.result) {
  //       getListFollowing();
  //       getListPostAccountFollowing();
  //       getListPostExpertFollowing();
  //     } else {
  //       // useError("Create post fail!");
  //     }
  //   },
  //   onError: () => {
  //     // useError("Save fail!!!!");

  //   },
  // });
  //  const { mutateAsync: createFollow } = useMutation({
  //   mutationFn: createFollowApi,

  //   onSuccess: () => {
  //     message.success("Follow successfully");
  //   },
  // });
  return {
    listFollowing,
    getListFollowing,
    // getFollow,
    // getUnfollow,
    // createFollow,
  };
}
export default useFollow;
