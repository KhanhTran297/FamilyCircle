import { Avatar, Input } from "antd";
import { ILocalArrowRight } from "../svg/arrow_right";
import PropTypes from "prop-types";
import { useState } from "react";
import { ILocalArrowComment } from "../svg/arrowcomment";
import useCommentMutate from "../../hooks/useMutate/useCommentMutate";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import TextArea from "antd/es/input/TextArea";
const CommentForm = (props) => {
  const { createComment } = useCommentMutate(props.parentId, null);
  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const [inputValue, setInputValue] = useState("");
  const handleCreateComment = (values) => {
    const parentId = props.parentId ? props.parentId : "";
    const data = {
      postId: props.id,
      commentContent: values.target.value,
      parentId,
    };
    setInputValue("");
    createComment(data);
  };
  const className =
    props.depth === 2
      ? "flex flex-row gap-2 pb-4 "
      : "w-full flex flex-row gap-2 pb-4";
  return (
    <div className={className}>
      {props.depth === 2 && (
        <div className=" w-[45px] flex justify-center items-center relative">
          <ILocalArrowComment className=" absolute right-[-5px] xl:right-0 w-[20px] h-[20px] top-0" />
        </div>
      )}

      <div className="">
        <Avatar
          src={accountProfile?.data?.avatar}
          className=" xl:w-10 xl:h-10 rounded-[40px] h-10 w-10 "
        />
      </div>

      <TextArea
        placeholder="Say some thing about this post..."
        classNames=" flex flex-row-reverse pl-4 p-[0px] h-10 flex-1-0-0 rounded-[100px] items-center cursor-text hover:!border-gray-400 "
        prefix={
          <ILocalArrowRight
            fill="#1F1A1C"
            className="   p-[8px] ml-3 hover:bg-tab hover:bg-opacity-[8%] cursor-pointer rounded-full"
          />
        }
        onPressEnter={(values) => {
          handleCreateComment(values);
        }}
        autoSize
        showCount
        maxLength={200}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      ></TextArea>
    </div>
  );
};
CommentForm.propTypes = {
  id: PropTypes.any,
  parentId: PropTypes.any,
  depth: PropTypes.any,
};
export default CommentForm;
