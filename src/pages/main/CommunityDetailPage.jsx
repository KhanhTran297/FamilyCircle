import { useParams } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";
import { ILocalFollowProfile } from "../../components/svg/followprofile";
import { ILocalMore } from "../../components/svg/more";
import TopicItem from "../../components/shared/TopicItem";
import { Skeleton } from "antd";
import UsePost from "../../hooks/UsePost";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../../components/post/Post";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListCategoryApi } from "../../api/category";
import { ListUserCommunityApi } from "../../api/community";
import { useEffect, useState } from "react";
import useCommunityMutate from "../../hooks/useMutate/useCommunityMutate";

const CommunityDetailPage = (props) => {
  const params = useParams();
  const [checkFollow, setCheckFollow] = useState(false);
  const { unFollowCommunity, followCommunity } = useCommunityMutate();
  const queryClient = useQueryClient();
  const [text, setText] = useState("Following");
  const [color, setColor] = useState("#A73574");
  const { data: detailCommunity } = useQuery({
    queryKey: ["getDetailCommunity", params.communityName],
    queryFn: () =>
      getListCategoryApi({ name: params.communityName }).then((res) => {
        return res?.data?.content[0];
      }),
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: datacheckFollow } = useQuery({
    queryKey: ["checkFollow"],
    queryFn: () =>
      ListUserCommunityApi({
        accountId: user[0].accountId,
        communityName: params.communityName,
      }).then((res) => {
        return res?.data?.totalElements === 0 ? false : true;
      }),
  });
  const {
    listPostExpert,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = UsePost(0, 0, 0, false);
  const topicItems = [
    {
      img: "https://cdn-together.marrybaby.vn/communities/1st-trimester.png",
      name: "3 tháng đầu",
    },
    {
      img: "https://cdn-together.marrybaby.vn/communities/1st-trimester.png",
      name: "3 tháng giữa",
    },
    {
      img: "https://cdn-together.marrybaby.vn/communities/1st-trimester.png",
      name: "3 tháng cuối",
    },
    {
      img: "https://cdn-together.marrybaby.vn/communities/twins-multiples.png",
      name: "Song thai",
    },
  ];
  useEffect(() => {
    setCheckFollow(datacheckFollow);
  }, [datacheckFollow]);
  return (
    <div className=" w-full flex flex-col h-full mt-[60px] xl:pr-3 xl:gap-4 xl:mt-3   ">
      <div className=" flex flex-col w-full gap-3 xl:h-[350px] xl:shadow-lg rounded-t-lg xl:rounded-b-xl xl:border-none border-b border-b-solid border-b-[#ccc]">
        <div className="rounded-t-lg w-full flex justify-center xl:h-[250px] bg-[#ffeaf1]">
          <img
            src={detailCommunity?.categoryImage}
            alt=""
            className="h-full xl:w-[350px]"
          />
        </div>
        <div className=" flex xl:flex-row flex-col gap-3 xl:gap-0 pl-3 pr-3 pb-3 xl:justify-between">
          <div className="flex xl:flex-row flex-col xl:gap-3 gap-2">
            <div className="">
              {/* <img
                src="https://cdn-together.marrybaby.vn/communities/getting-pregnant.png"
                alt=""
              /> */}
            </div>
            <div className="flex  flex-col xl:gap-2 xl:justify-center">
              <div className=" font-roboto xl:text-lg font-normal">
                {detailCommunity?.categoryName}
              </div>
              <div className=" flex flex-row gap-4">
                <p className=" font-roboto text-base font-normal">4 topics</p>
                <div className=" flex flex-row gap-2">
                  <TeamOutlined style={{ fontSize: "16px", color: `black` }} />
                  <p className="font-roboto text-base font-normal">
                    {" "}
                    5.2k followers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-row items-center ">
            {checkFollow ? (
              <div
                onClick={() =>
                  unFollowCommunity({ communityId: detailCommunity?.id }).then(
                    () => {
                      queryClient.invalidateQueries(["checkFollow"]);
                    }
                  )
                }
                onMouseEnter={() => {
                  setText("Unfollow"), setColor("red");
                }}
                onMouseLeave={() => {
                  setText("Following"), setColor("#A73574");
                }}
                className="  flex h-10 xl:w-[150px] w-full pr-4 pl-4 items-center justify-center gap-[7px] rounded-[36px] border border-solid border-button-submit-light cursor-pointer hover:bg-bgErrorButton hover:border-[#BA1A1A]"
              >
                <p
                  className={` text-[${color}] font-roboto text-sm font-medium `}
                >
                  {text}
                </p>
              </div>
            ) : (
              <div
                onClick={() =>
                  followCommunity({ communityId: detailCommunity?.id }).then(
                    () => {
                      queryClient.invalidateQueries(["checkFollow"]);
                    }
                  )
                }
                className=" flex h-10 pr-4 pl-4 xl:w-[150px] xl:justify-center items-center gap-[7px] rounded-[36px] bg-button-submit-light hover:bg-button-hover-light cursor-pointer hover:shadow-buttonHover"
              >
                <ILocalFollowProfile
                  className=" w-[18px] h-[18px]"
                  fill="black"
                />
                <p className=" text-[#fff] font-roboto text-sm font-medium ">
                  Follow
                </p>
              </div>
            )}
            {checkFollow && (
              <div className=" ">
                <ILocalMore fill="black" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" xl:grid xl:grid-flow-col flex flex-col-reverse mt-3 xl:mt-0  xl:gap-10 xl:grid-cols-[75%_calc(25%-40px)] pl-2 pr-2 xl:h-full">
        <div className="  xl:h-full w-full">
          {
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
              className=""
            >
              {listPostExpert &&
                listPostExpert.pages &&
                listPostExpert.pages.map((page, pageIndex) => (
                  <div key={pageIndex}>
                    <div className="flex flex-col gap-6 overflow-y-auto desktop:mt-6 mt-6 max-h-100vh desktop:mb-6 w-full ">
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
          }
        </div>
        <div className="  h-full w-full flex flex-col xl:gap-4">
          <div className="">
            <p className=" font-roboto text-lg font-normal">Description:</p>
            <p className=" font-roboto text-sm font-light">
              {detailCommunity?.categoryDescription}
            </p>
          </div>
          <div className=" xl:flex xl:flex-col xl:gap-2 hidden">
            <div className="">
              <p className=" font-roboto text-lg font-normal border-b-solid border-b-[3px] border-b-[#ffd8e8]">
                {" "}
                Topics
              </p>
            </div>
            <div className=" xl:flex xl:flex-col xl:gap-1  ">
              {topicItems.map((item, index) => (
                <TopicItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommunityDetailPage.propTypes = {};

export default CommunityDetailPage;
