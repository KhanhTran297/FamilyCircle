import { useDispatch, useSelector } from "react-redux";

import {
  approvePostApi,
  createPostApi,
  deletePostApi,
  getListPostAccountApi,
  getListPostApi,
  getListPostExpertApi,
  getPostApi,
  rejectPostApi,
  updatePostApi,
} from "../api/post";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { setListPost, setPostId } from "../redux/slice/post";
import { message } from "antd";
function UsePost(statusPost, sizelist, page) {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.account);
  const userAccount = selector.account;
  const selectorExpert = useSelector((state) => state.expert);
  const userExpert = selectorExpert.expert;
  const {
    data: listPost,
    refetch: getListPost,
    isSuccess: getListSuccess,
    isLoading: getListLoading,
  } = useQuery({
    queryKey: ["listPost"],
    queryFn: () => getListPostApi(statusPost, sizelist, page),
    enabled: true,

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

  const {
    data: listPostAccount,
    refetch: getListPostAccount,
    error: accountError, // Renamed 'error' to 'accountError'
    fetchNextPage: accountFetchNextPage, // Renamed 'fetchNextPage' to 'accountFetchNextPage'
    hasNextPage: accountHasNextPage, // Renamed 'hasNextPage' to 'accountHasNextPage'
    isFetching: accountIsFetching, // Renamed 'isFetching' to 'accountIsFetching'
    isFetchingNextPage: accountIsFetchingNextPage, // Renamed 'isFetchingNextPage' to 'accountIsFetchingNextPage'
    status: accountStatus, // Renamed 'status' to 'accountStatus'
  } = useInfiniteQuery({
    queryKey: ["listPostAccount"],
    queryFn: getListPostAccountApi,
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
        if (userAccount) {
          getListPost();
        } else if (userExpert) {
          getListPostExpert();
        }
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });

  //editPost
  const { mutate: updatePost } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: (respone) => {
      if (respone.result) {
        if (userAccount) {
          getListPostAccount();
        } else if (userExpert) {
          getListPostExpert();
        }
      } else {
        // useError("Update post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });

  //deletePost
  const { mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (respone) => {
      if (respone.result) {
        if (respone.result) {
          if (userAccount) {
            getListPostAccount();
          } else if (userExpert) {
            getListPostExpert();
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
  //approvePost
  const { mutate: approvePost, isLoading: loadingApprove } = useMutation({
    mutationFn: approvePostApi,
    onSuccess: () => {
      getListPost(statusPost, sizelist, page);
      message.success("Approve post success!");
    },
    onError: () => {
      message.error("Approve post fail!");
    },
  });
  //rejectPost
  const { mutate: rejectPost, isLoading: loadingReject } = useMutation({
    mutationFn: rejectPostApi,
    onSuccess: () => {
      getListPost(statusPost, sizelist, page);
      message.success("Reject post success!");
    },
    onError: () => {
      message.error("Reject post fail!");
    },
  });
  return {
    loadingApprove,
    loadingReject,
    approvePost,
    rejectPost,
    getListLoading,
    getListSuccess,
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
    updatePost,
    deletePost,
    getListPostAccount,
    listPostAccount,
    accountFetchNextPage,
    accountHasNextPage,
    accountIsFetching,
    accountIsFetchingNextPage,
    accountStatus,
    accountError,
  };
}

export default UsePost;
