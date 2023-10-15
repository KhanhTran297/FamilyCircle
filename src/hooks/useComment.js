import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  createCommentApi,
  deleteCommentApi,
  getListCommentApi,
} from "../api/comment";

function useComment(postId, commentId, check) {
  const {
    data: listComment,
    refetch: getListComment,
    isSuccess: isSuccessComment,
    isLoading: isloadingComment,
  } = useQuery({
    queryKey: ["listcomment"],
    queryFn: () => getListCommentApi(postId, ""),
    enabled: check,
    retry: 0,
  });
  const {
    data: listChildComment,
    refetch: getListChildComment,
    isSuccess: isSuccessChildComment,
    isLoading: isloadingChildComment,
  } = useQuery({
    queryKey: ["listChildComment"],
    queryFn: () => getListCommentApi(postId, 6821710386135040),
    enabled: check,
    retry: 0,
  });
  const { mutate: createComment } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      getListComment(postId);
    },
  });
  const { mutate: deleteComment } = useMutation({
    mutationFn: () => deleteCommentApi(commentId),
    onSuccess: () => {
      getListComment(postId);
    },
  });
  return {
    deleteComment,
    getListChildComment,
    listChildComment,
    isSuccessChildComment,
    isloadingChildComment,
    getListComment,
    listComment,
    isloadingComment,
    isSuccessComment,
    createComment,
  };
}
export default useComment;
