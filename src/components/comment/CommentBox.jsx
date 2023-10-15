import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Skeleton } from "antd";

const CommentBox = (props) => {
  return (
    <div className="xl:w-full xl:flex xl:flex-col xl:gap-6 hidden">
      {props.isLoading ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <CommentList listComment={props.commentList} id={props.postId} />
      )}

      <CommentForm id={props.postId} />
    </div>
  );
};

CommentBox.propTypes = {
  commentList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  postId: PropTypes.number.isRequired,
};

export default CommentBox;
