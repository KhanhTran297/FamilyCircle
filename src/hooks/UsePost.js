import { useDispatch, useSelector } from "react-redux";

import {
  createPostApi,
  getListPostApi,
  getListPostExpertApi,
  getPostApi,
} from "../api/post";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { setListPost, setPostId } from "../redux/slice/post";
import { useState } from "react";
function UsePost() {
  const dispatch = useDispatch();
  const { data: listPost, refetch: getListPost } = useQuery({
    queryKey: ["listPost"],
    queryFn: () => getListPostApi(),
    enabled: false,
    retry: 0,
    onSuccess: (listPost) => {
      dispatch(setListPost(listPost.data));
    },
  });
  const postId = useSelector((state) => state.post.postId);
  const {
    data: listPostExpert,
    refetch: getListPostExpert,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["listPostExpert"],
    queryFn: getListPostExpertApi, // Sử dụng pageParam từ biến địa phương
    getNextPageParam: (lastPage, pages) => {
      const totalPages = lastPage.data.totalPages;
      if (pages.length < totalPages) {
        return pages.length;
      } else {
        return undefined;
      }
    },
  });

  // // getPost
  const { data: post, refetch: getPost } = useQuery(
    ["post", postId],
    () => getPostApi(postId),
    {
      enabled: false,
      retry: 0,
      onSuccess: (post) => {
        dispatch(setPostId(post.data));
      },
    }
  );

  //createPost
  const { mutate: createPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (respone) => {
      if (respone.result) {
        // getListPost();
        getListPostExpert();
        // useSuccess("Create post success!");
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });

  return {
    listPostExpert,
    getListPostExpert,
    createPost,
    post,
    getPost,
    listPost,
    getListPost,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
  };
}

export default UsePost;
