import { useMutation, useQuery } from "@tanstack/react-query";
import { getListReactionApi, getReactApi } from "../api/react";
import { useDispatch } from "react-redux";

function useReact(postId) {
  const dispatch = useDispatch();

  const { data: listReaction, refetch: getListReaction } = useQuery(
    ["listReaction", postId],
    () => getListReactionApi(postId),
    {
      enabled: !!postId,
    }
  );
  //create and delete react
  const { mutate: getReact } = useMutation({
    mutationFn: getReactApi,
    onSuccess: (respone) => {
      if (respone.result) {
        getListReaction();
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
