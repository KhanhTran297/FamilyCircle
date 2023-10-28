import React from "react";
import BookmarkPost from "./BookmarkPost";
import InfiniteScroll from "react-infinite-scroll-component";
import useBookmark from "../../hooks/useBookmark";
import { Skeleton } from "antd";

const Bookmark = () => {
  const {
    listBookmarkLoad,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useBookmark();
  return (
    <div className="w-full px-6 desktop:px-0">
      <InfiniteScroll
        dataLength={listBookmarkLoad?.pages?.length || 0}
        next={() => {
          setTimeout(() => {
            fetchNextPage();
          }, 1000);
        }}
        hasMore={hasNextPage}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
          />
        }
        className="gap-6"
      >
        {listBookmarkLoad &&
          listBookmarkLoad.pages &&
          listBookmarkLoad.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              <div className="flex flex-col gap-6 overflow-y-auto desktop:mt-6 mt-[80px] max-h-100vh desktop:mb-6 w-full ">
                {Array.isArray(page.data.content) && // Kiểm tra xem page.data là mảng
                  page.data.content.map((bookmarkpost) => (
                    <BookmarkPost
                      key={bookmarkpost.id}
                      idpost={bookmarkpost.postDto.id}
                      content={bookmarkpost.postDto.content}
                      fullname={bookmarkpost.postDto.owner.fullName}
                      avt={bookmarkpost.postDto.owner.avatar}
                    />
                  ))}
              </div>
            </div>
          ))}
        {isFetchingNextPage ? (
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
          />
        ) : hasNextPage ? (
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
          />
        ) : null}
        {isFetching && !isFetchingNextPage ? (
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
          />
        ) : null}
      </InfiniteScroll>
    </div>
  );
};

export default Bookmark;
