import CommentLeft from "./CommentLeft";
import CommentBody from "./CommentBody";
import CommentRight from "./CommentRight";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import CommentList from "./CommentList";
import useComment from "../../hooks/useComment";
const Comment = (props) => {
  const { comment } = props;
  const commentTime = dayjs(comment.createdAt).format("DD/MM/YYYY");
  const timeFormat = dayjs(commentTime).fromNow();
  // const { listChildComment } = useComment(props.id, comment.id);
  return (
    <div className="xl:flex xl:flex-row   gap-2 pt-4 pb-4">
      <CommentLeft
        img={
          "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg"
        }
      />
      <div className="xl:flex xl:flex-col xl:flex-auto">
        <div className="xl:flex xl:flex-row">
          <CommentBody
            fullName={comment.owner.fullName}
            kind={comment.owner.kind}
            date={commentTime}
            content={comment.commentContent}
          />
          <CommentRight commentId={comment.id} />
        </div>
        {/* <CommentList listComment={listChildComment} id={props.id} /> */}
      </div>
    </div>
  );
};
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  id: PropTypes.number,
};
export default Comment;
