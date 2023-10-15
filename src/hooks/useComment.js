import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  createCommentApi,
  deleteCommentApi,
  getListChildCommentApi,
  getListCommentApi,
} from "../api/comment";
import { useLocation } from "react-router-dom";

function useComment(commentId, check) {
  const location = useLocation();
  const parts = location.pathname.split("/");
  const postDetailId = parts[parts.length - 1];
  const {
    data: listComment,
    refetch: getListComment,
    isSuccess: isSuccessComment,
    isLoading: isloadingComment,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["listcomment"],
    queryFn: () => getListCommentApi(postDetailId, "", 5),
    onSuccess: () => {
      getListChildComment();
    },
    getNextPageParam: (lastPage, pages) => {
      const totalPages = lastPage.data.totalPages;
      if (pages.length < totalPages) {
        return pages.length;
      } else {
        return undefined;
      }
    },
    enabled: check,
    retry: false,
  });
  // const {
  //   data: listChildComment,
  //   refetch: getListChildComment,
  //   isSuccess: isSuccessChildComment,
  //   isLoading: isloadingChildComment,
  // } = useQuery({
  //   queryKey: ["listChildComment"],
  //   queryFn: () => getListCommentApi(postId, 6821710386135040),
  //   enabled: check,
  //   retry: 0,
  // });
  const { data: listChildComment, refetch: getListChildComment } = useQuery({
    queryKey: ["listChildComment", commentId],
    queryFn: () => getListChildCommentApi(postDetailId, commentId),
  });
  const { mutate: createComment } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      getListComment();
    },
  });
  const { mutate: deleteComment } = useMutation({
    mutationFn: () => deleteCommentApi(commentId),
    onSuccess: () => {
      getListComment();
    },
  });
  return {
    deleteComment,
    // getListChildComment,
    // listChildComment,
    // isSuccessChildComment,
    // isloadingChildComment,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    getListComment,
    listComment,
    isloadingComment,
    isSuccessComment,
    createComment,
    listChildComment,
  };
}
export default useComment;
