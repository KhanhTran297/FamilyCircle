import PropTypes from "prop-types";
import Comment from "./Comment";

const CommentList = ({ listComment }, props) => {
  return (
    <div className=" flex flex-col">
      {listComment?.map((comment) => {
        return (
          <Comment key={comment.id} data={comment} postId={props.postId} />
        );
      })}
    </div>
  );
};

CommentList.propTypes = {
  postId: PropTypes.number.isRequired,
  listComment: PropTypes.array.isRequired,
};

export default CommentList;
