import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentLeft from "./CommentLeft";
import CommentRight from "./CommentRight";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import ChildComment from "./ChildComment";
import TextArea from "antd/es/input/TextArea";
import useCommentMutate from "../../hooks/useMutate/useCommentMutate";
import { useQuery } from "@tanstack/react-query";
import { getListChildCommentApi } from "../../api/comment";

const Comment = (props) => {
  const { data } = props;
  const { id } = useParams();
  const [active, setActive] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const parts = location.pathname.split("/");
  const postDetailId = parts[parts.length - 1];
  const { data: listChildComment } = useQuery({
    queryKey: ["listChildComment", data.id],
    queryFn: () => getListChildCommentApi(id, data.id),
  });
  const { editComment } = useCommentMutate(data.id, null);
  const handleEdit = async (values) => {
    editComment({
      id: data.id,
      commentContent: values.target.value,
    }).then(() => {
      setIsEditing(false);
    });
  };

  const handleActiveReply = () => {
    setActive(!active);
  };
  const handleShowReply = () => {
    setShowReply(!showReply);
  };
  const handleSetEdit = () => {
    setIsEditing(true);
  };
  // setCountComments(count + listChildComment?.data?.content?.length);
  return (
    <div className={`xl:flex xl:flex-col  overflow-x-hidden `}>
      <div className="flex flex-row gap-2 overflow-x-hidden ">
        <CommentLeft
          img={data?.owner?.avatar}
          root={true}
          showReply={showReply}
          activeCol={active}
        />
        {isEditing ? (
          <div className="w-full pb-4 ">
            <TextArea
              defaultValue={data.commentContent}
              onPressEnter={(e) => {
                handleEdit(e);
              }}
              onKeyDown={(e) => {
                e.key == "Escape" && setIsEditing(false);
              }}
            />
            <p className=" text-[12px] font-roboto text-light_surface_on_surface">
              {" "}
              Press <span className="text-blue-400 "> Esc</span> to return
            </p>
          </div>
        ) : (
          <CommentRight
            data={data}
            eventReply={handleActiveReply}
            eventShowReply={handleShowReply}
            eventEdit={handleSetEdit}
            countComment={listChildComment?.data?.content?.length}
            root={true}
          />
        )}
      </div>

      {showReply && (
        <div className="flex flex-col ">
          {listChildComment?.data?.content?.map((comment, index, array) => (
            <ChildComment
              key={comment.id}
              parentId={data.id}
              data={comment}
              eventReply={handleActiveReply}
              depth={2}
              isLastChild={index === array.length - 1}
              activeCol={active}
            />
          ))}
        </div>
      )}
      {active && (
        <CommentForm
          id={postDetailId}
          idowner={props.idowner}
          parentId={data.id}
          depth={2}
          socket={props.socket}
        />
      )}
    </div>
  );
};
Comment.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.number,
  root: PropTypes.bool.isRequired,
  socket: PropTypes.any,
  idowner: PropTypes.any,
};
export default Comment;
