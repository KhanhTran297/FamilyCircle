import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getListReactionApi, getReactApi } from "../api/react";

function useReact(postId) {
  // const { data: listReaction, refetch: getListReaction } = useQuery(
  //   ["listReaction", postId],
  //   () => getListReactionApi(postId),
  //   {
  //     enabled: !!postId,
  //   }
  // );
  const queryClinet = useQueryClient();
  const { data: listReaction, refetch: getListReaction } = useQuery({
    queryKey: ["listReaction", postId],
    queryFn: (queryKey) =>
      getListReactionApi(queryKey).then((res) => {
        return res;
      }),
    enabled: true,
  });
  //create and delete react
  const { mutateAsync: getReact } = useMutation({
    mutationFn: getReactApi,
    onSuccess: (respone) => {
      if (respone.result) {
        queryClinet.invalidateQueries(["listReaction", postId]);
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  return { listReaction, getListReaction, getReact };
}
export default useReact;
