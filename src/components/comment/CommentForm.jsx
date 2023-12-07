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
      ? "xl:flex xl:flex-row xl:gap-2 pb-4 "
      : "xl:w-full xl:flex xl:flex-row xl:gap-2 pb-4";
  return (
    <div className={className}>
      {props.depth === 2 && (
        <div className=" w-[45px] flex justify-center items-center relative">
          <ILocalArrowComment className=" absolute right-0 w-[20px] h-[20px] top-0" />
        </div>
      )}

      <div className="">
        <Avatar
          src={accountProfile?.data?.avatar}
          className=" xl:w-10 xl:h-10 xl:rounded-[40px]"
        />
      </div>

      <TextArea
        placeholder="Say some thing about this post..."
        classNames=" xl:flex xl:flex-row-reverse xl:pl-4 xl:p-[0px] xl:h-10 xl:flex-1-0-0 xl:rounded-[100px] xl:items-center xl:cursor-text hover:!border-gray-400 "
        prefix={
          <ILocalArrowRight
            fill="#1F1A1C"
            className="   xl:p-[8px] xl:ml-3 hover:bg-tab hover:bg-opacity-[8%] xl:cursor-pointer xl:rounded-full"
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
  id: PropTypes.string.isRequired,
  parentId: PropTypes.any,
  depth: PropTypes.any,
};
export default CommentForm;
