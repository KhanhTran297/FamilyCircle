import { useParams, useSearchParams } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";
import { ILocalFollowProfile } from "../../components/svg/followprofile";
import { ILocalMore } from "../../components/svg/more";
import TopicItem from "../../components/shared/TopicItem";
import { Skeleton } from "antd";

import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../../components/post/Post";
import { CloseOutlined } from "@ant-design/icons";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Modal from "react-modal";
import { getListCategoryApi } from "../../api/category";
import { ListUserCommunityApi } from "../../api/community";
import { useEffect, useState } from "react";
import useCommunityMutate from "../../hooks/useMutate/useCommunityMutate";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import { getListPostNewApi } from "../../api/post";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CommunityDetailPage = (props) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [checkFollow, setCheckFollow] = useState(false);
  const { unFollowCommunity, followCommunity } = useCommunityMutate();
  const queryClient = useQueryClient();
  const [text, setText] = useState("Following");
  const [color, setColor] = useState("#A73574");
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  const { data: detailCommunity } = useQuery({
    queryKey: ["getDetailCommunity", params.communityName],
    queryFn: () =>
      getListCategoryApi({ name: params.communityName }).then((res) => {
        return res?.data?.content[0];
      }),
  });
  const { data: listTopics } = useQuery({
    queryKey: ["getListTopic", detailCommunity?.id],
    queryFn: () =>
      getListCategoryApi({ parentId: detailCommunity?.id }).then((res) => {
        return res?.data?.content;
      }),
    enabled: !!detailCommunity?.id,
  });
  const { data: listMember, refetch: refetchListMember } = useQuery({
    queryKey: ["getListMemberCommunity", detailCommunity?.id],
    queryFn: () =>
      ListUserCommunityApi({ communityName: params.communityName }).then(
        (res) => {
          return res?.data;
        }
      ),
  });
  const accountId = useGetFetchQuery(["accountProfile"]);
  const {
    data: listPostCommunity,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [
      `getListPostCommunity`,
      searchParams.get("topicId"),
      detailCommunity?.id,
    ],
    queryFn: ({ pageParam = 0 }) =>
      getListPostNewApi({
        size: 5,
        page: pageParam,
        status: 1,
        topicId: searchParams.get("topicId"),
        communityId: detailCommunity?.id,
      }),
    enabled: !!detailCommunity?.id,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.data.totalPages) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  const { data: datacheckFollow } = useQuery({
    queryKey: ["checkFollow"],
    queryFn: () =>
      ListUserCommunityApi({
        accountId: accountId?.data?.id,
        communityName: params.communityName,
      }).then((res) => {
        return res?.data?.totalElements === 0 ? false : true;
      }),
  });
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
        <div className="flex flex-col gap-3 pb-3 pl-3 pr-3 xl:flex-row xl:gap-0 xl:justify-between">
          <div className="flex flex-col gap-2 xl:flex-row xl:gap-3">
            <div className="">
              {/* <img
                src="https://cdn-together.marrybaby.vn/communities/getting-pregnant.png"
                alt=""
              /> */}
            </div>
            <div className="flex flex-col xl:gap-2 xl:justify-center">
              <div className="font-normal font-roboto xl:text-lg">
                {detailCommunity?.categoryName}
              </div>
              <div className="flex flex-row gap-4 ">
                <p className="text-base font-normal font-roboto">
                  {listTopics
                    ? listTopics?.length > 1
                      ? listTopics?.length + " topics"
                      : listTopics?.length + " topic"
                    : "0 topic"}
                </p>
                <div className="flex flex-row gap-2 ">
                  <TeamOutlined style={{ fontSize: "16px", color: `black` }} />
                  <p
                    className="text-base font-normal cursor-pointer font-roboto"
                    onClick={() => openModal()}
                  >
                    {" "}
                    {listMember
                      ? listMember?.totalElements > 1
                        ? listMember?.totalElements + " followers"
                        : listMember?.totalElements + " follower"
                      : "0 follower"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center ">
            {checkFollow ? (
              <div
                onClick={() =>
                  unFollowCommunity({ communityId: detailCommunity?.id }).then(
                    () => {
                      queryClient.invalidateQueries(["checkFollow"]);
                      refetchListMember();
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
                      refetchListMember();
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
            {/* {checkFollow && (
              <div className="">
                <ILocalMore fill="black" />
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className=" xl:grid xl:grid-flow-col flex flex-col-reverse mt-3 xl:mt-0  xl:gap-10 xl:grid-cols-[75%_calc(25%-40px)] pl-2 pr-2 xl:h-full">
        <div className="w-full xl:h-full">
          {isLoading ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : (
            <InfiniteScroll
              dataLength={listPostCommunity?.pages?.length || 0}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={
                <Skeleton
                  avatar
                  paragraph={{
                    rows: 4,
                  }}
                />
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              className="gap-6"
            >
              {listPostCommunity?.pages?.map((page, pageIndex) => (
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
        </div>
        <div className="flex flex-col w-full h-full xl:gap-4">
          <div className="">
            <p className="text-lg font-normal font-roboto">Description:</p>
            <p className="text-sm font-light font-roboto">
              {detailCommunity?.categoryDescription}
            </p>
          </div>
          <div className="hidden xl:flex xl:flex-col xl:gap-2">
            <div className="">
              <p className=" font-roboto text-lg font-normal border-b-solid border-b-[3px] border-b-[#ffd8e8]">
                {" "}
                Topics
              </p>
            </div>
            <div className=" xl:flex xl:flex-col xl:gap-1">
              {listTopics?.map((item, index) => (
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
