import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getReactApi } from "../../api/react";
import { useParams } from "react-router-dom";
function useReactMutate() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { mutateAsync: getReact } = useMutation({
    mutationFn: getReactApi,
    onSuccess: (respone) => {
      if (respone.result) {
        queryClient.invalidateQueries(["listReaction", id]);
        queryClient.invalidateQueries(["postDetail", id]);
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });

  return { getReact };
}
export default useReactMutate;
