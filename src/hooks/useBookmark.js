import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  getBookmarkApi,
  getListBookmarkApi,
  getListBookmarkLoadApi,
} from "../api/bookmark";

function useBookmark() {
  const { data: listBookmark, refetch: getListBookmark } = useQuery({
    queryKey: ["listBookmark"],
    queryFn: getListBookmarkApi,
    enabled: false,
    retry: 0,
  });

  const {
    data: listBookmarkLoad,
    refetch: getListBookmarkLoad,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["listBookmarkLoad"],
    queryFn: getListBookmarkLoadApi, // Sử dụng pageParam từ biến địa phương
    getNextPageParam: (lastPage, pages) => {
      const totalPages = lastPage.data.totalPages;
      if (pages.length < totalPages) {
        return pages.length;
      } else {
        return undefined;
      }
    },
  });
  //create and delete bookmark
  const { mutate: getBookmark } = useMutation({
    mutationFn: getBookmarkApi,
    onSuccess: (respone) => {
      if (respone.result) {
        getListBookmark();
        getListBookmarkLoad();
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  return {
    listBookmark,
    getListBookmark,
    getBookmark,
    listBookmarkLoad,
    getListBookmarkLoad,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
export default useBookmark;
