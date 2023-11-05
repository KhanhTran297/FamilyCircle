import { ILocalComment } from "../svg/comment";
import { ILocalHeartComment } from "../svg/hear_comment";
import { ILocalReply } from "../svg/reply";
import IconFooter from "./IconFooter";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { ILocalEmptyHeart } from "../svg/empty_heart";
import useCommentMutate from "../../hooks/useMutate/useCommentMutate";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
const CommentFooter = ({
  eventReply,
  data,
  countComment,
  eventShowReply,
  root,
  parentId,
}) => {
  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const { reactcomment } = useCommentMutate(data?.id, parentId);
  const handleReactComment = () => {
    reactcomment({ commentId: data?.id, kind: 1 });
  };

  const checkReact = () => {
    // if (profileAccount) {
    //   const check = data.commentReactions?.filter(
    //     (item) => item?.id === profileAccount?.data?.id
    //   );

    //   if (check) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else {
    //   const check = data.commentReactions?.filter(
    //     (item) => item?.id === profileExpertAccount?.data?.id
    //   );
    //   if (check) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    const check = data.commentReactions?.filter((item) => {
      item?.id === accountProfile?.data?.id;
    });
    if (check) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    checkReact();
  }, []);
  return (
    <div className=" xl:flex xl:flex-row xl:gap-4 mt-1 pb-4">
      <IconFooter
        check={true}
        count={data.commentReactions?.length || 0}
        handleClick={() => handleReactComment()}
      >
        {checkReact() ? (
          <ILocalHeartComment fill="#A73574" className="" />
        ) : (
          <ILocalEmptyHeart className="" />
        )}
      </IconFooter>
      {root && (
        <IconFooter
          count={countComment || 0}
          check={true}
          handleClick={() => eventShowReply()}
        >
          <ILocalComment fill="#A73574" width={24} height={24} className="" />
        </IconFooter>
      )}
      <IconFooter check={false} handleClick={() => eventReply()}>
        <ILocalReply fill="#1F1A1C" className="" />
      </IconFooter>
    </div>
  );
};
CommentFooter.propTypes = {
  eventReply: PropTypes.func.isRequired,
  eventShowReply: PropTypes.func,
  data: PropTypes.object.isRequired,
  countComment: PropTypes.number,
  root: PropTypes.bool.isRequired,
};
export default CommentFooter;
