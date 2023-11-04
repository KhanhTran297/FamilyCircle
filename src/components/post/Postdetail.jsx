// import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types";
import AvtUser from "../shared/AvtUser";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import { Skeleton } from "antd";
import useComment from "../../hooks/useComment";
import CommentForm from "../comment/CommentForm";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../comment/Comment";
import useReact from "../../hooks/useReact";
import useBookmark from "../../hooks/useBookmark";
import useFollow from "../../hooks/useFollow";
import UsePost from "../../hooks/UsePost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { ILocalDot } from "../svg/Dot";
// import { ILocalMore } from "../svg/more";
const PostDetail = (props) => {
  // const { theme } = useTheme({});
  // const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const { listComment, fetchNextPage, hasNextPage } = useComment("", true);

  // console.log("Child", listComment[1].data());

  const { listReaction, getReact } = useReact(props.id);
  const { getBookmark, listBookmark } = useBookmark();
  const { getFollow, listFollowing, getUnfollow } = useFollow();
  const { deletePost } = UsePost();
  const selector = useSelector((state) => state.account);
  const userAccount = selector.account;
  const selectorExpert = useSelector((state) => state.expert);
  const userExpert = selectorExpert.expert;
  const reactCount = listReaction?.data?.totalElements;
  const navigate = useNavigate();

  const handleDeletePost = (id) => {
    deletePost(id);
  };
  const handleActionReact = (kindPost, id) => {
    const data = { kind: kindPost, postId: id };
    getReact(data);
  };
  const handleActionBookmark = (id) => {
    console.log("bookmark:", id);
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
  const userId = userAccount?.id || userExpert?.id;
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
    <div className="flex flex-col items-start xl:gap-6 gap-6 p-6 pt-3  rounded-[24px] w-full  bg-[#FFF8F8] cursor-pointer">
      <div className="flex flex-row items-start self-stretch gap-2">
        <div className="w-10 h-10">
          <AvtUser imageUrl="https://icdn.dantri.com.vn/thumb_w/640/2019/01/20/2-1547917870331.jpg" />
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
        <div className="relative flex flex-col w-full overflow-hidden h-max ">
          <div className="flex flex-col items-start w-full gap-6 shrink-0">
            <div
              className="w-full text-sm font-normal h-max read-more-read-less font-roboto"
              dangerouslySetInnerHTML={{ __html: props.content }}
            ></div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-b-[1px] border-[#F1DEE4] h-[1px] w-full"></div>
      <FooterPost
        {...props}
        reactCount={reactCount}
        handleActionReact={() => handleActionReact(props.kindPost, props.id)}
        isLike={isLike}
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
                    <Comment key={comment.id} data={comment} root={true} />
                  ))}
              </div>
            ))}
        </InfiniteScroll>
      </div>

      <CommentForm id={props.id} parentId={""} />
    </div>
  );
};
PostDetail.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
export default PostDetail;
