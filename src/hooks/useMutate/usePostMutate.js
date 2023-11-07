import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostApi, deletePostApi, updatePostApi } from "../../api/post";
import { useGetFetchQuery } from "../useGetFetchQuery";
import { useParams } from "react-router-dom";

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
          } else {
            queryClient.invalidateQueries(["listPostExpert"]);
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
        } else {
          queryClient.invalidateQueries(["listPostExpert"]);
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
        } else {
          queryClient.invalidateQueries(["listPostExpert"]);
        }
      } else {
        // useError("Update post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  return {
    deletePost,
    createPost,
    updatePost,
  };
}
export default usePostMutate;
