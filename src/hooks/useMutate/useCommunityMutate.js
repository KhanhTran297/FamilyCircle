import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { followCommunityApi, unFolowCommunityApi } from "../../api/community";

function useCommunityMutate() {
  const queryClient = useQueryClient();
  const { mutateAsync: unFollowCommunity } = useMutation({
    mutationKey: ["unFollowCommunity"],
    mutationFn: unFolowCommunityApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["ListUserCommunity"]); // Invalidate the query
      message.success("Unfollow community success");
    },
  });
  const { mutateAsync: followCommunity } = useMutation({
    mutationKey: ["followCommunity"],
    mutationFn: followCommunityApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["ListUserCommunity"]); // Invalidate the query
      message.success("Follow community success");
    },
  });
  return {
    unFollowCommunity,
    followCommunity,
  };
}
export default useCommunityMutate;
