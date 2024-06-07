// import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types";
import AvtUser from "../shared/AvtUser";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import { Skeleton } from "antd";

import CommentForm from "../comment/CommentForm";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../comment/Comment";
import useBookmark from "../../hooks/useBookmark";
import useFollow from "../../hooks/useFollow";
import usePostMutate from "../../hooks/useMutate/usePostMutate";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getListChildCommentApi, getListCommentApi } from "../../api/comment";
import { useParams } from "react-router-dom";
import useFollowMutate from "../../hooks/useMutate/useFollowMutate";
import useBookmarkMutate from "../../hooks/useMutate/useBookmarkMutate";
import useReactMutate from "../../hooks/useMutate/useReactMutate";
import { useRecoilState } from "recoil";
import { countComments } from "../../uilts/atom";
import { child, get, getDatabase, ref } from "firebase/database";
import { pushNotificationApi } from "../../api/notification";
const PostDetail = (props) => {
  const { id } = useParams();
  const [count, setCountComments] = useRecoilState(countComments);
  const {
    data: listComment,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["listcomment", id],
    queryFn: ({ pageParam = 0, postId = id, size = 5 }) =>
      getListCommentApi(pageParam, postId, size),
    getNextPageParam: (lastPage, pages) => {
      const totalPages = lastPage.data.totalPages;
      if (pages.length < totalPages) {
        return pages.length;
      } else {
        return undefined;
      }
    },
    enabled: true,
  });

  var countListComment = 0;
  const { data: listcommentForCount } = useQuery({
    queryKey: ["listcommentForCount"],
    queryFn: () => getListChildCommentApi(id),
    onSuccess: (result) => {
      countListComment = result?.data?.totalElements;
      // countListComment.push(result.data.content);
      Promise?.resolve(result?.data?.content)
        .then((res) => {
          res?.map(async (item) => {
            const tempData = await getListChildCommentApi(id, item.id);
            if (tempData?.data?.content) {
              countListComment = countListComment + res?.data?.content?.length;
            }
          });
        })
        .finally(() => {
          setCountComments(countListComment);
        });
      // Promise?.all(
      //   result?.data?.content?.map(async (item) => {
      //     const res = await getListChildCommentApi(id, item.id);
      //     if (res?.data?.content) {
      //       countListComment = countListComment + res?.data?.content?.length;
      //     }
      //   })
      // ).then(() => {
      //   setCountComments(countListComment);
      // });
    },
  });
  const { getReact } = useReactMutate(props.id);
  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const postDetail = useGetFetchQuery(["postDetail", id]);
  const { listBookmark } = useBookmark();
  const { getBookmark } = useBookmarkMutate();
  const { listFollowing } = useFollow();
  const { getFollow, getUnfollow } = useFollowMutate();
  const { deletePost } = usePostMutate();
  const accountProfileId = accountProfile?.data?.id;
  const reactCount = postDetail?.data?.postReactions?.length;
  const listReactionPost = postDetail?.data?.postReactions;
  const listBookmarkPost = listBookmark?.data?.content;
  const listFollowingPerson = listFollowing?.data?.content;
  const dbRef = ref(getDatabase());
  const handlePushNotification = (type) => {
    get(child(dbRef, `users/${props?.idowner}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          pushNotificationApi({
            message: {
              token: snapshot.val().token,
              notification: {
                title: accountProfile?.data?.fullName,
                body:
                  type === "follow"
                    ? `${accountProfile?.data?.fullName} has followed you`
                    : `${accountProfile?.data?.fullName} has liked your post`,
                image: accountProfile?.data?.avatar,
              },
              webpush: {
                fcm_options: {
                  link:
                    type === "follow"
                      ? `https://familycircle.vercel.app/profile/${props?.idowner}`
                      : `https://familycircle.vercel.app/post/${props.id}`,
                },
              },
            },
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleActionFollow = (accountId) => {
    const data = { accountId: accountId };
    getFollow(data).then(() => handlePushNotification("follow"));
  };

  const handleActionUnfollow = (accountId) => {
    getUnfollow(accountId);
  };
  const isBookmark = (postId) => {
    if (listBookmarkPost && Array.isArray(listBookmarkPost)) {
      const bookmark = listBookmarkPost.find(
        (bookmark) => bookmark.postDto.id === postId
      );
      return bookmark !== undefined;
    }
    return false;
  };
  const isLike =
    accountProfile?.data?.id && listReactionPost
      ? listReactionPost.some(
          (reaction) => reaction.accountId === accountProfile?.data?.id
        )
      : false;
  const isFollow = (accountId) => {
    if (listFollowingPerson && Array.isArray(listFollowingPerson)) {
      const follow = listFollowingPerson.find(
        (follow) => follow.account.id === accountId
      );
      return follow !== undefined;
    }
    return false;
  };

  return (
    <div className="flex flex-col items-start xl:gap-6 gap-6 p-6 pt-3  rounded-[24px] w-full  bg-[#FFF8F8] cursor-pointer">
      <div className="flex flex-row items-start self-stretch gap-2">
        <div className="w-10 h-10">
          <AvtUser imageUrl={props.avatar} />
        </div>
        <HeaderPost
          {...props}
          onDelete={() => deletePost({ id: props.id })}
          handleActionBookmark={() => getBookmark({ postId: props.id })}
          isBookmarked={isBookmark(props.id)}
          handleActionFollow={() => handleActionFollow(props.idowner)}
          isFollowed={isFollow(props.idowner)}
          handleActionUnfollow={() => handleActionUnfollow(props.idowner)}
        />
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="relative flex flex-col w-full overflow-hidden h-max ">
          <div className="flex flex-col items-start w-full gap-6 shrink-0">
            {props.title ? (
              <div className="font-roboto text-title font-medium text-[#1F1A1C]">
                {props.title}
              </div>
            ) : (
              ""
            )}
            <div
              className="w-full text-sm font-normal break-all h-max read-more-read-less font-roboto"
              dangerouslySetInnerHTML={{ __html: props.content }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        {props.topics !== undefined &&
          props.topics.map((item, index) => (
            <div
              key={index}
              className="text-xs font-roboto font-normal text-[#828282]"
            >
              <p className="text-sm font-normal font-roboto">
                {"#" + item.nameTopic}
              </p>
            </div>
          ))}
      </div>
      <div className="border-t-[1px] border-b-[1px] border-[#F1DEE4] h-[1px] w-full"></div>
      <FooterPost
        {...props}
        reactCount={reactCount}
        commentCount={count}
        handleActionReact={() =>
          getReact({ kind: 1, postId: props.id })
            .then((res) => {
              if (res.data.ownerPostId != accountProfileId) {
                handlePushNotification("like");
              }
            })
            .catch((error) => {
              console.error("Lỗi khi tạo thông báo:", error);
            })
        }
        handleActionUnreact={() => getReact({ kind: 1, postId: props.id })}
        isLike={isLike}
        PostId={props.id}
      />
      <div className="border-t-[1px] border-b-[1px] border-[#F1DEE4] h-[1px] w-full"></div>
      <div className="w-full ">
        <InfiniteScroll
          dataLength={listComment?.pages?.length || 0}
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
        >
          {listComment &&
            listComment?.pages?.map((page, index) => (
              <div className="flex flex-col" key={index}>
                {Array.isArray(page.data.content) &&
                  page.data.content.map((comment) => (
                    <Comment
                      idowner={props.idowner}
                      key={comment.id}
                      data={comment}
                      root={true}
                    />
                  ))}
              </div>
            ))}
        </InfiniteScroll>
      </div>
      <div className="hidden w-full max-w-full xl:block">
        <CommentForm
          id={props.id}
          idowner={props.idowner}
          parentId={""}
          parentUser={""}
          depth={1}
        />
      </div>
    </div>
  );
};
PostDetail.propTypes = {
  content: PropTypes.string,
  author: PropTypes.object,
  createdAt: PropTypes.string,
  likes: PropTypes.number,
  id: PropTypes.number,
  idowner: PropTypes.any,
  kindPost: PropTypes.string,
  topics: PropTypes.array,
};
export default PostDetail;
