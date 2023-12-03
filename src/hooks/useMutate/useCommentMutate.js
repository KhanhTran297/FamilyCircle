import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCommentApi,
  deleteCommentApi,
  editCommentApi,
  reactCommentApi,
} from "../../api/comment";
import { message } from "antd";

function useCommentMutate(commentId, parentId) {
  const queryClient = useQueryClient();
  const { mutateAsync: createComment } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["listcomment"]);
      queryClient.invalidateQueries(["listChildComment", commentId]);
      queryClient.invalidateQueries(["listcommentForCount"]);
      // if (parentId) {
      //   queryClient.invalidateQueries(["listChildComment", commentId]);
      // } else {
      //   queryClient.invalidateQueries(["listcomment"]);
      // }
    },
  });
  const { mutateAsync: reactcomment } = useMutation({
    mutationFn: reactCommentApi,
    onSuccess: () => {
      message.success("react comment success");
      if (parentId) {
        queryClient.invalidateQueries(["listChildComment", parentId]);
      } else {
        queryClient.invalidateQueries(["listcomment"]);
      }
    },
  });
  const { mutateAsync: deleteComment } = useMutation({
    mutationFn: () => deleteCommentApi(commentId),
    onSuccess: () => {
      // queryClient.invalidateQueries(["listcomment"]);
      queryClient.invalidateQueries(["listcommentForCount"]);
      if (parentId) {
        queryClient.invalidateQueries(["listChildComment", parentId]);
      } else {
        queryClient.invalidateQueries(["listcomment"]);
      }
    },
  });
  const { mutateAsync: editComment } = useMutation({
    mutationFn: editCommentApi,
    onSuccess: () => {
      message.success("edit comment success");
      // queryClient.invalidateQueries(["listcomment"]);
      if (parentId) {
        queryClient.invalidateQueries(["listChildComment", parentId]);
      } else {
        queryClient.invalidateQueries(["listcomment"]);
      }
    },
  });
  return {
    createComment,
    reactcomment,
    deleteComment,
    editComment,
  };
}
export default useCommentMutate;
