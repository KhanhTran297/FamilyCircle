import CommentLeft from "./CommentLeft";
import CommentRight from "./CommentRight";
import PropTypes from "prop-types";

const Comment = (props) => {
  const { data } = props;
  return (
    <div className="xl:flex xl:flex-row xl:overflow-x-hidden  gap-2 pt-4 pb-4">
      <CommentLeft img={data?.owner?.avtar} />
      <CommentRight data={data} />
    </div>
  );
};
Comment.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.number,
};
export default Comment;
