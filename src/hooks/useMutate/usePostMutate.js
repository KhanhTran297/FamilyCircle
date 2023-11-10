import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approvePostApi,
  createPostApi,
  deletePostApi,
  rejectPostApi,
  updatePostApi,
} from "../../api/post";
import { useGetFetchQuery } from "../useGetFetchQuery";
import { useParams } from "react-router-dom";
import { message } from "antd";

function usePostMutate() {
  const queryClient = useQueryClient();
  const { profileId } = useParams();
  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const { mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (respone) => {
      if (respone.result) {
        if (respone.result) {
          {
            profileId &&
              queryClient.invalidateQueries([
                "listOwnPostinfinitie",
                profileId,
              ]);
            queryClient.invalidateQueries(["listOwnPost", profileId]);
          }
          if (accountProfile?.data?.kind === 2) {
            queryClient.invalidateQueries(["listPostUserAccounts"]);
            queryClient.invalidateQueries(["listPostAccountFollowing"]);
          } else {
            queryClient.invalidateQueries(["listPostExpert"]);
            queryClient.invalidateQueries(["listPostUserAccounts"]);
            queryClient.invalidateQueries(["listPostAccountFollowing"]);
            queryClient.invalidateQueries(["listPostExpertFollowing"]);
          }
        }
        // useSuccess("Delete post success!");
      } else {
        // useError("Delete post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  const { mutate: createPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (respone) => {
      if (respone.result) {
        if (accountProfile?.data?.kind === 2) {
          queryClient.invalidateQueries(["listPostUserAccounts"]);
          queryClient.invalidateQueries(["listPostAccountFollowing"]);
        } else {
          queryClient.invalidateQueries(["listPostExpert"]);
          queryClient.invalidateQueries(["listPostUserAccounts"]);
          queryClient.invalidateQueries(["listPostAccountFollowing"]);
          queryClient.invalidateQueries(["listPostExpertFollowing"]);
        }
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  const { mutate: updatePost } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: (respone) => {
      if (respone.result) {
        {
          profileId &&
            queryClient.invalidateQueries(["listOwnPost", profileId]);
          queryClient.invalidateQueries(["listOwnPostinfinitie", profileId]);
        }
        if (accountProfile?.data?.kind === 2) {
          queryClient.invalidateQueries(["listPostUserAccounts"]);
          queryClient.invalidateQueries(["listPostAccountFollowing"]);
        } else {
          queryClient.invalidateQueries(["listPostExpert"]);
          queryClient.invalidateQueries(["listPostUserAccounts"]);
          queryClient.invalidateQueries(["listPostAccountFollowing"]);
          queryClient.invalidateQueries(["listPostExpertFollowing"]);
        }
      } else {
        // useError("Update post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  const { mutateAsync: approvePost, isLoading: loadingApprove } = useMutation({
    mutationFn: approvePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["listPost"]);
      message.success("Approve post success!");
    },
    onError: () => {
      message.error("Approve post fail!");
    },
  });
  //rejectPost
  const { mutateAsync: rejectPost, isLoading: loadingReject } = useMutation({
    mutationFn: rejectPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["listPost"]);
      message.success("Reject post success!");
    },
    onError: () => {
      message.error("Reject post fail!");
    },
  });
  return {
    rejectPost,
    deletePost,
    createPost,
    updatePost,
    approvePost,
  };
}
export default usePostMutate;
