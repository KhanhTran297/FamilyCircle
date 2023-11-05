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

// import { ILocalDot } from "../svg/Dot";
// import { ILocalMore } from "../svg/more";

const Post = (props) => {
  const { listReaction, getReact } = useReact(props.id);
  const { getFollow, getUnfollow } = useFollowMutate();
  const listFollowing = useGetFetchQuery(["listFollowing"]);
  const { getBookmark } = useBookmarkMutate();
  const listBookmark = useGetFetchQuery(["listBookmark"]);
  const { deletePost } = usePostMutate();
  const accountProfile = useGetFetchQuery(["accountProfile"]);
  // const selector = useSelector((state) => state.account);
  // const userAccount = selector.account;
  // const selectorExpert = useSelector((state) => state.expert);
  // const userExpert = selectorExpert.expert;

  const reactCount = listReaction?.data?.totalElements;
  const navigate = useNavigate();
  let limit = 1000;
  let content;
  if (props.content.length > limit) {
    content = props.content.slice(0, limit) + "...";
  } else {
    content = props.content;
  }
  const handleDeletePost = (id) => {
    deletePost(id);
  };
  const handleActionReact = (kindPost, id) => {
    const data = { kind: kindPost, postId: id };
    getReact(data);
  };
  const handleActionBookmark = (id) => {
    const data = { postId: id };
    getBookmark(data);
  };
  const handleActionFollow = (accountId) => {
    const data = { accountId: accountId };
    getFollow(data);
  };
  const handleActionUnfollow = (accountId) => {
    getUnfollow(accountId);
  };
  const listReactionPost = listReaction?.data?.content;
  const listBookmarkPost = listBookmark?.data?.content;

  const listFollowingPerson = listFollowing?.data?.content;

  const userId = accountProfile?.data?.id; // Lấy userId từ userAccount hoặc userExpert
  // const isBookmark = userId && listBookmarkPost.some((bookmark) => bookmark.)

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
    userId && listReactionPost
      ? listReactionPost.some((reaction) => reaction.accountId === userId)
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
          onDelete={() => handleDeletePost(props.id)}
          handleActionBookmark={() => handleActionBookmark(props.id)}
          isBookmarked={isBookmark(props.id)}
          handleActionFollow={() => handleActionFollow(props.idowner)}
          isFollowed={isFollow(props.idowner)}
          handleActionUnfollow={() => handleActionUnfollow(props.idowner)}
        />
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col max-h-[320px] w-full  overflow-hidden relative ">
          <div className="flex flex-col items-start w-full gap-6 shrink-0">
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
          <div className="flex flex-col items-center justify-center self-stretch gap-[10px] cursor-pointer">
            <button className="cursor-pointer flex h-10 gap-[7px] bg-[#A73574] rounded-[36px] px-4 flex-row items-center">
              <ILocalViewMore fill="#FFF8F8" />
              <p className="font-roboto text-[#FFF] text-sm font-medium">
                View more
              </p>
            </button>
          </div>
        ) : (
          ""
        )}
        <FooterPost
          {...props}
          reactCount={reactCount}
          handleActionReact={() => handleActionReact(props.kindPost, props.id)}
          isLike={isLike}
        />
      </div>
    </div>
  );
};
Post.propTypes = {
  key: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
export default Post;
