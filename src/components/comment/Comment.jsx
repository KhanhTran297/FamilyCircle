import { useState } from "react";
import useComment from "../../hooks/useComment";
import CommentForm from "./CommentForm";
import CommentLeft from "./CommentLeft";
import CommentRight from "./CommentRight";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const Comment = (props) => {
  const { data } = props;
  const [active, setActive] = useState(false);
  const location = useLocation();
  const parts = location.pathname.split("/");
  const postDetailId = parts[parts.length - 1];
  const { listChildComment } = useComment(data.id, false);
  const handleActiveReply = () => {
    setActive(!active);
  };
  return (
    <div className="xl:flex xl:flex-col ">
      <div className=" grid grid-flow-col grid-cols-[6%_94%] gap-2 overflow-x-hidden">
        <CommentLeft img={data?.owner?.avtar} />
        <CommentRight data={data} eventReply={handleActiveReply} />
      </div>

      <div className="xl:flex xl:flex-col ml-[calc(6%+8px)] ">
        {listChildComment?.data?.content?.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))}
        {active && <CommentForm id={postDetailId} parentId={data.id} />}
      </div>
    </div>
  );
};
Comment.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.number,
};
export default Comment;
