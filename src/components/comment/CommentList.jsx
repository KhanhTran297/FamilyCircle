import PropTypes from "prop-types";
import Comment from "./Comment";

const CommentList = ({ listComment }) => {
  return (
    <div className=" flex flex-col">
      {listComment?.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

CommentList.propTypes = {
  postId: PropTypes.number.isRequired,
  listComment: PropTypes.array.isRequired,
};

export default CommentList;
