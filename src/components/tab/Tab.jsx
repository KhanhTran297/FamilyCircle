import { useState } from "react";
import Post from "../post/Post";
import { Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getListPostNewApi } from "../../api/post";

const Tab = (props) => {
  const [isFollowingPage, setIsFollowingPage] = useState(false);
  const {
    data: listPostHome,
    fetchNextPage: fetchNewPost,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["GetListPostHome", isFollowingPage],
    queryFn: ({ pageParam = 0 }) =>
      getListPostNewApi({
        page: pageParam,
        size: 5,
        status: 1,
        following: isFollowingPage,
      }),
    getNextPageParam: (LastPage, allPages) => {
      if (allPages.length < LastPage.data.totalPages) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col backdrop-blur-[32px] sticky top-14 desktop:top-0 z-20">
        <div className="flex items-start self-stretch px-6 py-2 ">
          <p className="font-medium text-title font-roboto">
            {props.kind === "1" ? "Home" : "Forum"}
          </p>
        </div>
        <div className="flex flex-row items-center w-full h-12 border-b-[1px] z-20 ">
          <div
            className="w-[50%] h-12 justify-center cursor-pointer flex hover:bg-tab hover:bg-opacity-[8%]"
            onClick={() => setIsFollowingPage(false)}
          >
            <button className="w-[54px] h-12 justify-between flex-col flex">
              <div className="h-[3px]  w-full rounded-t-[3px] justify-items-end"></div>

              <div className="text-base font-medium h-6 w-full text-[#A73574]  items-center justify-center font-roboto">
                For you
              </div>
              <div
                className={`${
                  isFollowingPage === false ? "bg-[#A73574]" : ""
                } h-[3px]   w-full rounded-t-[3px] justify-items-end`}
              ></div>
            </button>
          </div>
          <div
            className="w-[50%] h-12 justify-center flex hover:bg-tab hover:bg-opacity-[8%] cursor-pointer"
            onClick={() => setIsFollowingPage(true)}
          >
            <button className="w-[54px] h-12 justify-between flex-col flex">
              <div className="h-[3px]  w-full rounded-t-[3px] justify-items-end"></div>

              <div className="text-base font-medium h-6 w-full text-[#A73574]  items-center justify-center font-roboto">
                Following
              </div>
              <div
                className={`${
                  isFollowingPage === true ? "bg-[#A73574]" : ""
                } h-[3px]   w-full rounded-t-[3px] justify-items-end`}
              ></div>
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <InfiniteScroll
          dataLength={listPostHome?.pages?.length || 0}
          next={fetchNewPost}
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
          {listPostHome?.pages?.map((page, pageIndex) => (
            <div
              className="flex flex-col gap-6 overflow-y-auto desktop:mt-6 mt-[72px] max-h-100vh desktop:mb-6 w-full "
              key={pageIndex}
            >
              {Array.isArray(page?.data?.content) && // Kiểm tra xem page.data là mảng
                page?.data?.content
                  // .filter((post) => post.kind === 1)
                  .map((post, index) => (
                    <Post
                      key={index}
                      id={post.id}
                      content={post.content}
                      fullname={post.owner.fullName}
                      kind={post.owner.kind}
                      modifiedDate={post.modifiedDate}
                      createdDate={post.createdDate}
                      idowner={post.owner.id}
                      kindPost={post.kind}
                      avatar={post.owner.avatar}
                      title={post.title}
                      countComment={post?.commentList?.length || 0}
                      community={post?.community || "undefined"}
                    />
                  ))}
            </div>
          ))}
        </InfiniteScroll>
      )}
      {/* {props.kind === "1" && activeTab === "tab1" && (
        <InfiniteScroll
          dataLength={listPostExpert?.pages?.length || 0}
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
          {listPostExpert &&
            listPostExpert.pages &&
            listPostExpert.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                <div className="flex flex-col gap-6 overflow-y-auto desktop:mt-6 mt-[72px] max-h-100vh desktop:mb-6 w-full ">
                  {Array.isArray(page?.data?.content) && // Kiểm tra xem page.data là mảng
                    page?.data?.content
                      // .filter((post) => post.kind === 1)
                      .map((post, index) => (
                        <Post
                          key={index}
                          id={post.id}
                          content={post.content}
                          fullname={post.owner.fullName}
                          kind={post.owner.kind}
                          modifiedDate={post.modifiedDate}
                          createdDate={post.createdDate}
                          idowner={post.owner.id}
                          kindPost={post.kind}
                          avatar={post.owner.avatar}
                          title={post.title}
                          countComment={post?.commentList?.length || 0}
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
      )}
      {props.kind === "2" && activeTab === "tab1" && (
        <InfiniteScroll
          dataLength={listPostAccount?.pages?.length || 0} // Số lượng mục hiện có
          next={() => {
            // Đặt thời gian trễ 1 giây trước khi tải tiếp dữ liệu
            setTimeout(() => {
              accountFetchNextPage();
            }, 1000);
          }}
          hasMore={accountHasNextPage} // Kiểm tra xem còn nhiều hơn để tải hay không
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          } // Hiển thị thông báo tải
          className="gap-6"
        >
          {listPostAccount &&
            listPostAccount.pages &&
            listPostAccount.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                <div className="flex flex-col gap-6  desktop:mt-6 mt-[72px] max-h-100vh desktop:mb-6 w-full ">
                  {Array.isArray(page.data.content) && // Kiểm tra xem page.data là mảng
                    page.data.content
                      // .filter((post) => post.kind === 1)
                      .map((post, index) => (
                        // console.log(post.id),
                        <Post
                          key={index}
                          id={post.id}
                          content={post.content}
                          fullname={post.owner.fullName}
                          kind={post.owner.kind}
                          modifiedDate={post.modifiedDate}
                          createdDate={post.createdDate}
                          idowner={post.owner.id}
                          kindPost={post.kind}
                          avatar={post.owner.avatar}
                          title={post.title}
                        />
                      ))}
                </div>
              </div>
            ))}
          {accountIsFetchingNextPage ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : accountHasNextPage ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : null}
          {accountIsFetching && !accountIsFetchingNextPage ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : null}
        </InfiniteScroll>
      )}
      {props.kind === "1" && activeTab === "tab2" && (
        <InfiniteScroll
          dataLength={listPostExpertFollowing?.pages?.length || 0}
          next={() => {
            setTimeout(() => {
              expertFetchNextPageFollowing();
            }, 1000);
          }}
          hasMore={expertHasNextPageFollowing}
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
          {listPostExpertFollowing &&
            listPostExpertFollowing.pages &&
            listPostExpertFollowing.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                <div className="flex flex-col gap-6 overflow-y-auto desktop:mt-6 mt-[72px] max-h-100vh desktop:mb-6 w-full ">
                  {Array.isArray(page.data.content) && // Kiểm tra xem page.data là mảng
                    page.data.content
                      // .filter((post) => post.kind === 1)
                      .map((post, index) => (
                        // console.log(post.id),
                        <Post
                          key={index}
                          id={post.id}
                          content={post.content}
                          fullname={post.owner.fullName}
                          kind={post.owner.kind}
                          modifiedDate={post.modifiedDate}
                          createdDate={post.createdDate}
                          idowner={post.owner.id}
                          kindPost={post.kind}
                          avatar={post.owner.avatar}
                          title={post.title}
                          countComment={post?.commentList?.length || 0}
                        />
                      ))}
                </div>
              </div>
            ))}
          {expertIsFetchingNextPageFollowing ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : expertHasNextPageFollowing ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : null}
          {expertIsFetchingFollowing && !expertIsFetchingNextPageFollowing ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : null}
        </InfiniteScroll>
      )}
      {props.kind === "2" && activeTab === "tab2" && (
        <InfiniteScroll
          dataLength={listPostAccountFollowing?.pages?.length || 0}
          next={() => {
            setTimeout(() => {
              accountFetchNextPageFollowing();
            }, 1000);
          }}
          hasMore={accountHasNextPageFollowing}
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
          {listPostAccountFollowing &&
            listPostAccountFollowing.pages &&
            listPostAccountFollowing.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                <div className="flex flex-col gap-6 overflow-y-auto desktop:mt-6 mt-[72px] max-h-100vh desktop:mb-6 w-full ">
                  {Array.isArray(page.data.content) && // Kiểm tra xem page.data là mảng
                    page.data.content
                      // .filter((post) => post.kind === 1)
                      .map((post, index) => (
                        // console.log(post.id),
                        <Post
                          key={index}
                          id={post.id}
                          content={post.content}
                          fullname={post.owner.fullName}
                          kind={post.owner.kind}
                          modifiedDate={post.modifiedDate}
                          createdDate={post.createdDate}
                          idowner={post.owner.id}
                          kindPost={post.kind}
                          avatar={post.owner.avatar}
                          title={post.title}
                          countComment={post?.commentList?.length || 0}
                        />
                      ))}
                </div>
              </div>
            ))}
          {accountIsFetchingNextPageFollowing ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : accountHasNextPageFollowing ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : null}
          {accountIsFetchingFollowing && !accountIsFetchingNextPageFollowing ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : null}
        </InfiniteScroll>
      )} */}
      {/* {props.kind === "1" && activeTab === "tab2" && <div>Hello</div>} */}
    </div>
  );
};

export default Tab;
