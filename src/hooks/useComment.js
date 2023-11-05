import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  // createCommentApi,
  // deleteCommentApi,
  // editCommentApi,
  getListChildCommentApi,
  // getListCommentApi,
  // reactCommentApi,
} from "../api/comment";
import { useParams } from "react-router-dom";
import { message } from "antd";

function useComment(commentId, check) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  // const {
  //   data: listComment,
  //   refetch: getListComment,
  //   isSuccess: isSuccessComment,
  //   isLoading: isloadingComment,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery({
  //   queryKey: ["listcomment"],
  //   queryFn: () => getListCommentApi(id, "", 5),
  //   onSuccess: () => {
  //     getListChildComment();
  //   },
  //   getNextPageParam: (lastPage, pages) => {
  //     const totalPages = lastPage.data.totalPages;
  //     if (pages.length < totalPages) {
  //       return pages.length;
  //     } else {
  //       return undefined;
  //     }
  //   },
  //   enabled: id ? true : false,
  //   retry: false,
  // });
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
    queryFn: () => getListChildCommentApi(id, commentId),
  });
  // const { mutateAsync: createComment } = useMutation({
  //   mutationFn: createCommentApi,
  //   onSuccess: () => {
  //     getListComment();

  //   },
  // });
  // const { mutateAsync: reactcomment } = useMutation({
  //   mutationFn: reactCommentApi,
  //   onSuccess: () => {
  //     message.success("react comment success");
  //     getListComment();
  //   },
  // });
  // const { mutateAsync: deleteComment } = useMutation({
  //   mutationFn: () => deleteCommentApi(commentId),
  //   onSuccess: () => {
  //     getListComment();
  //   },
  // });
  // const { mutateAsync: editComment, isSuccess: editSuccess } = useMutation({
  //   mutationFn: editCommentApi,
  //   onSuccess: () => {
  //     message.success("edit comment success");
  //     getListComment();
  //   },
  // });
  return {
    // editComment,
    // deleteComment,
    // editSuccess,
    // getListChildComment,
    // listChildComment,
    // isSuccessChildComment,
    // isloadingChildComment,
    // reactcomment,
    // fetchNextPage,
    // hasNextPage,
    // isFetching,
    // isFetchingNextPage,
    // status,
    // getListComment,
    // listComment,
    // isloadingComment,
    // isSuccessComment,
    // createComment,
    listChildComment,
  };
}
export default useComment;
