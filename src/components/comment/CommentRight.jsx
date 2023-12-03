import PropTypes from "prop-types";
import CommentSetting from "./CommentSetting";
import CommentFooter from "./CommentFooter";
import CommentBody from "./CommentBody";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

const CommentRight = (props) => {
  const {
    data,
    eventReply,
    countComment,
    eventShowReply,
    root,
    eventEdit,
    parentId,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  // const { editComment } = useComment(data.id, false);

  // const handleSetEdit = () => {
  //   setIsEditing(!isEditing);
  // };

  // const handleEdit = async (values) => {
  //   await editComment({
  //     id: data.id,
  //     commentContent: values.target.value,
  //   }).then(() => {
  //     setIsEditing(false);
  //   });
  // };

  return (
    <div className="xl:flex xl:flex-row gap-2 flex-1">
      <div className=" center xl:flex xl:flex-col xl:flex-auto ">
        {isEditing ? (
          <TextArea
            defaultValue={data.commentContent}
            // onChange={(e) => setNewContent(e.target.value)}
            // onPressEnter={(e) => {
            //   handleEdit(e);
            // }}
            onKeyDown={(e) => {
              {
                e.key == "Escape" && setIsEditing(false);
              }
            }}
          />
        ) : (
          <CommentBody
            fullName={data?.owner?.fullName}
            kind={data?.owner?.kind}
            dateCreate={data.createdDate}
            dateModify={data.modifiedDate}
            content={data.commentContent}
          />
        )}

        <CommentFooter
          eventReply={eventReply}
          eventShowReply={eventShowReply}
          data={data}
          parentId={parentId}
          countComment={countComment}
          root={root}
        />
      </div>
      <CommentSetting
        commentId={data.id}
        data={data}
        parentId={parentId}
        eventEditing={eventEdit}
      />
    </div>
  );
};
CommentRight.propTypes = {
  data: PropTypes.object.isRequired,
  eventReply: PropTypes.func,
  eventEdit: PropTypes.func,
  eventShowReply: PropTypes.func,
  countComment: PropTypes.number,
  root: PropTypes.bool.isRequired,
};
export default CommentRight;
