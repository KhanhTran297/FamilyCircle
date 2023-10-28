import { Fragment, useEffect, useState } from "react";
import Post from "../post/Post";
import UsePost from "../../hooks/UsePost";
import UseCookie from "../../hooks/UseCookie";
import { Navigate } from "react-router-dom";
import { Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const Tab = (props) => {
  const { isLoggedIn } = UseCookie();
  const {
    listPostExpert,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    listPostAccount,
    accountFetchNextPage,
    accountHasNextPage,
    accountIsFetching,
    accountIsFetchingNextPage,
  } = UsePost();

  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
            onClick={() => handleTabClick("tab1")}
          >
            <button className="w-[54px] h-12 justify-between flex-col flex">
              <div className="h-[3px]  w-full rounded-t-[3px] justify-items-end"></div>

              <div className="text-base font-medium h-6 w-full text-[#A73574]  items-center justify-center font-roboto">
                For you
              </div>
              <div
                className={`${
                  activeTab === "tab1" ? "bg-[#A73574]" : ""
                } h-[3px]   w-full rounded-t-[3px] justify-items-end`}
              ></div>
            </button>
          </div>
          <div
            className="w-[50%] h-12 justify-center flex hover:bg-tab hover:bg-opacity-[8%] cursor-pointer"
            onClick={() => handleTabClick("tab2")}
          >
            <button className="w-[54px] h-12 justify-between flex-col flex">
              <div className="h-[3px]  w-full rounded-t-[3px] justify-items-end"></div>

              <div className="text-base font-medium h-6 w-full text-[#A73574]  items-center justify-center font-roboto">
                Following
              </div>
              <div
                className={`${
                  activeTab === "tab2" ? "bg-[#A73574]" : ""
                } h-[3px]   w-full rounded-t-[3px] justify-items-end`}
              ></div>
            </button>
          </div>
        </div>
      </div>
      {props.kind === "1" ? (
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
      ) : (
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
    </div>
  );
};

export default Tab;
