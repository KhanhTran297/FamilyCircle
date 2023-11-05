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
      if (parentId) {
        queryClient.invalidateQueries(["listChildComment", parentId]);
      } else {
        queryClient.invalidateQueries(["listChildComment", commentId]);
      }
    },
  });
  const { mutateAsync: reactcomment } = useMutation({
    mutationFn: reactCommentApi,
    onSuccess: () => {
      message.success("react comment success");
      queryClient.invalidateQueries(["listcomment"]);
      if (parentId) {
        queryClient.invalidateQueries(["listChildComment", parentId]);
      } else {
        queryClient.invalidateQueries(["listChildComment", commentId]);
      }
    },
  });
  const { mutateAsync: deleteComment } = useMutation({
    mutationFn: () => deleteCommentApi(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["listcomment"]);
      if (parentId) {
        queryClient.invalidateQueries(["listChildComment", parentId]);
      } else {
        queryClient.invalidateQueries(["listChildComment", commentId]);
      }
    },
  });
  const { mutateAsync: editComment } = useMutation({
    mutationFn: editCommentApi,
    onSuccess: () => {
      message.success("edit comment success");
      queryClient.invalidateQueries(["listcomment"]);
      if (parentId) {
        queryClient.invalidateQueries(["listChildComment", parentId]);
      } else {
        console.log("parentId", parentId);
        queryClient.invalidateQueries(["listChildComment", commentId]);
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
