import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import Post from "../post/Post";
import UsePost from "../../hooks/UsePost";

const TabPosts = () => {
  const {
    listOwnPost,
    fetchNextPagePostProfile,
    hasNextPagePostProfile,
    isFetchingNextPagePostProfile,
  } = UsePost();
  return (
    <InfiniteScroll
      dataLength={listOwnPost?.pages?.length || 0}
      next={() => {
        fetchNextPagePostProfile();
      }}
      hasMore={hasNextPagePostProfile}
      loader={
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      }
    >
      {listOwnPost &&
        listOwnPost.pages &&
        listOwnPost.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            <div className="flex flex-col gap-6 overflow-y-auto desktop:mt-6 mt-[72px] max-h-100vh desktop:mb-6 w-full ">
              {Array.isArray(page.data.content) && // Kiểm tra xem page.data là mảng
                page.data.content
                  // .filter((post) => post.kind === 1)
                  .map((post) => (
                    // console.log(post.id),
                    <Post
                      key={post.id}
                      id={post.id}
                      content={post.content}
                      fullname={post.owner.fullName}
                      kind={post.owner.kind}
                      modifiedDate={post.modifiedDate}
                      createdDate={post.createdDate}
                      idowner={post.owner.id}
                      kindPost={post.kind}
                    />
                  ))}
            </div>
          </div>
        ))}
      {isFetchingNextPagePostProfile ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : hasNextPagePostProfile ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : null}
    </InfiniteScroll>
  );
};

export default TabPosts;
