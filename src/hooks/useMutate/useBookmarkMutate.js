import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookmarkApi } from "../../api/bookmark";

function useBookmarkMutate() {
  const queryClient = useQueryClient();
  const { mutate: getBookmark } = useMutation({
    mutationFn: getBookmarkApi,
    onSuccess: (respone) => {
      if (respone.result) {
        queryClient.invalidateQueries(["listBookmark"]);
        queryClient.invalidateQueries(["listBookmarkLoad"]);
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  return {
    getBookmark,
  };
}
export default useBookmarkMutate;
