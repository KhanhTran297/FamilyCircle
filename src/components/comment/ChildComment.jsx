import { useState } from "react";
import { ILocalArrowComment } from "../svg/arrowcomment";
import CommentLeft from "./CommentLeft";
import CommentRight from "./CommentRight";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea";
import useCommentMutate from "../../hooks/useMutate/useCommentMutate";

const ChildComment = (props) => {
  const { data, parentId } = props;
  const [isEditing, setIsEditing] = useState(false);
  const { editComment } = useCommentMutate(data.id, parentId);
  const handleEdit = (values) => {
    editComment({
      id: data.id,
      commentContent: values.target.value,
    }).then(() => {
      setIsEditing(false);
    });
  };
  const handleSetEdit = () => {
    setIsEditing(true);
  };
  return (
    <div className=" flex flex-row gap-2 overflow-x-hidden">
      <div className=" w-10 flex justify-center items-center relative">
        <ILocalArrowComment className=" absolute right-0 w-[20px] h-[20px] top-0" />
        {props.isLastChild ? (
          props.activeCol && (
            <div className=" w-[1px] bg-[#F1DEE4] h-full"></div>
          )
        ) : (
          <div className=" w-[1px] bg-[#F1DEE4] h-full"></div>
        )}
      </div>
      <CommentLeft img={data?.owner?.avtar} root={false} />
      {isEditing ? (
        <div className=" w-full pb-4">
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
            Press <span className=" text-blue-400"> Esc</span> to return
          </p>
        </div>
      ) : (
        <CommentRight
          data={data}
          parentId={parentId}
          eventReply={props.eventReply}
          root={false}
          eventEdit={handleSetEdit}
        />
      )}
    </div>
  );
};
ChildComment.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.string,
  eventReply: PropTypes.func.isRequired,
  depth: PropTypes.number,
  isLastChild: PropTypes.bool.isRequired,
  activeCol: PropTypes.bool.isRequired,
};
export default ChildComment;
