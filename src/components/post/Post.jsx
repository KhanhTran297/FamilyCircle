// import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AvtUser from "../shared/AvtUser";
import { ILocalViewMore } from "../svg/viewmore";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import useReact from "../../hooks/useReact";
import usePostMutate from "../../hooks/useMutate/usePostMutate";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import useBookmarkMutate from "../../hooks/useMutate/useBookmarkMutate";
import useFollowMutate from "../../hooks/useMutate/useFollowMutate";
import { useQuery } from "@tanstack/react-query";
import { getListFollowingApi } from "../../api/follow";
import { getListBookmarkApi } from "../../api/bookmark";
import { child, get, getDatabase, ref } from "firebase/database";
import { pushNotificationApi } from "../../api/notification";
import ViewMoreButton from "../shared/ViewMoreButton";

// import { ILocalDot } from "../svg/Dot";
// import { ILocalMore } from "../svg/more";

const Post = (props) => {
  const { getReact, listReaction } = useReact(props.id);
  const { getFollow, getUnfollow } = useFollowMutate();
  const { getBookmark } = useBookmarkMutate();
  const { deletePost } = usePostMutate();
  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const accountProfileId = accountProfile?.data?.id;
  const reactCount = listReaction?.data?.totalElements;
  const navigate = useNavigate();
  let limit = 1000;
  let content;
  const dbRef = ref(getDatabase());
  if (props.content.length > limit) {
    content = props.content.slice(0, limit) + "...";
  } else {
    content = props.content;
  }

  const { data: listBookmark } = useQuery({
    queryKey: ["listBookmark"],
    queryFn: () =>
      getListBookmarkApi().then((res) => {
        return res.data;
      }),
  });
  const { data: listFollowing } = useQuery({
    queryKey: ["listFollowing"],
    queryFn: () => getListFollowingApi().then((res) => res.data),
  });
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
    getFollow({ accountId: accountId }).then(() =>
      handlePushNotification("follow")
    );
    // const content = ` started following you`;
    // const data2 = {
    //   content: content,
    //   objectId: accountProfileId,
    //   kind: 5,
    // };
    // createNotification(data2)
    //   .then((response) => {
    //     if (socket && socket.connected) {
    //       socket.emit("send-notification-new-follower", {
    //         accountId: accountProfileId,
    //         followerId: accountId,
    //         id: response.data.id,
    //         status: response.data.status,
    //         createdDate: response.data.createdDate,
    //         content: response.data.content,
    //         kind: response.data.kind,
    //         avatar: accountProfileAvatar,
    //         fullname: accountProfileFullname,
    //       });
    //     } else {
    //       console.error("Socket not connected");
    //     }
    //     const dataAnnounce = {
    //       notificationId: response.data.id,
    //       receivers: [accountId],
    //     };
    //     createAnnounce(dataAnnounce);
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi khi tạo thông báo:", error);
    //   });
  };

  const handleActionUnfollow = (accountId) => {
    getUnfollow(accountId);
  };
  const listReactionPost = listReaction?.data?.content;

  const userId = accountProfile?.data?.id; // Lấy userId từ userAccount hoặc userExpert
  // const isBookmark = userId && listBookmarkPost.some((bookmark) => bookmark.)

  const isBookmark = (postId) => {
    if (listBookmark?.totalElements > 0) {
      const bookmark = listBookmark?.content?.find(
        (bookmark) => bookmark.postDto.id === postId
      );
      return bookmark !== undefined;
    }
    return false;
  };
  const isLike =
    userId && listReactionPost
      ? listReactionPost.some((reaction) => reaction.accountId === userId)
      : false;

  const isFollow = (accountId) => {
    if (listFollowing?.totalElements >= 1) {
      const follow = listFollowing?.content?.find(
        (follow) => follow.account.id === accountId
      );
      return follow !== undefined;
    }
    return false;
  };
  return (
    <div className="flex flex-col items-start desktop:gap-6 gap-6 p-6 pt-3  rounded-[24px] w-full  bg-[#FFF8F8] cursor-pointer">
      <div className="flex flex-row items-start self-stretch gap-2">
        <div className="w-10 h-10">
          <AvtUser
            imageUrl={props?.avatar}
            ownerId={props?.idowner}
            kind={props?.kind}
          />
        </div>
        <HeaderPost
          {...props}
          onDelete={() => deletePost(props.id)}
          handleActionBookmark={() => getBookmark({ postId: props.id })}
          isBookmarked={isBookmark(props.id)}
          handleActionFollow={() => handleActionFollow(props.idowner)}
          isFollowed={isFollow(props.idowner)}
          handleActionUnfollow={() => handleActionUnfollow(props.idowner)}
        />
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col max-h-[320px] w-full  overflow-hidden relative ">
          <div className="flex flex-col items-start w-full gap-6 shrink-0">
            {props.title ? (
              <div className="font-roboto text-title font-medium text-[#1F1A1C]">
                {props.title}
              </div>
            ) : (
              ""
            )}
            <div
              className="w-full h-auto font-normal font-roboto"
              dangerouslySetInnerHTML={{ __html: content }}
              onClick={() => navigate(`/post/${props.id}`)}
            ></div>
          </div>
          {props.content.length > limit ? (
            <div className="w-full h-[72px] absolute bottom-0 bg-post "></div>
          ) : (
            ""
          )}
        </div>
        {props.content.length > limit ? (
          /* <div
            onClick={() => navigate(`/post/${props.id}`)}
            className="flex flex-col items-center justify-center self-stretch gap-[10px] cursor-pointer"
          >
            <button className="cursor-pointer flex h-10 gap-[7px] bg-[#A73574] rounded-[36px] px-4 flex-row items-center hover:bg-bgViewmore hover:shadow-buttonHover">
              <ILocalViewMore fill="#FFF8F8" />
              <p className="font-roboto text-[#FFF] text-sm font-medium">
                View more
              </p>
            </button>
          </div> */
          <div
            className="flex flex-col items-center justify-center self-stretch gap-[10px] cursor-pointer"
            onClick={() => navigate(`/post/${props.id}`)}
          >
            <ViewMoreButton />
          </div>
        ) : (
          ""
        )}
        <FooterPost
          {...props}
          reactCount={reactCount}
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
          PostId={props.id}
          isLike={isLike}
        />
      </div>
    </div>
  );
};
Post.propTypes = {
  content: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.number,
};
export default Post;
