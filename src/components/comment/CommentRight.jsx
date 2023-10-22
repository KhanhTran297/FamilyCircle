import PropTypes from "prop-types";
import dayjs from "dayjs";
import CommentSetting from "./CommentSetting";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getListCommentApi } from "../../api/comment";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { ILocalCircle } from "../svg/circle";
import IconFooter from "./IconFooter";
import { ILocalHeartComment } from "../svg/hear_comment";
import { ILocalComment } from "../svg/comment";
import { ILocalReply } from "../svg/reply";
// import { useState } from "react";
// import useComment from "../../hooks/useComment";

const CommentRight = (props) => {
  const { data, eventReply } = props;
  // const location = useLocation();
  // const [active, setActive] = useState(false);
  // const parts = location.pathname.split("/");
  // const postDetailId = parts[parts.length - 1];
  const handleFormatTime = (time) => {
    const commentTime = dayjs(time, "DD/MM/YYYY HH:mm:ss");
    const timeFormat = dayjs(commentTime).fromNow();
    return timeFormat;
  };
  // const { listChildComment } = useComment(data.id, false);
  // const { data: listChildComment } = useQuery({
  //   queryKey: ["listChildComment", data.id],
  //   queryFn: () => getListCommentApi(postDetailId, data.id, 5),
  // });
  return (
    <div className="xl:flex xl:flex-col xl:flex-auto ">
      <div className="xl:flex xl:flex-row">
        <div className=" center xl:flex xl:flex-col xl:flex-auto ">
          <div className="body xl:flex xl:flex-col gap-1">
            <div className="title xl:flex xl:flex-row gap-2 text-center items-center">
              <div className="name font-roboto text-sm font-medium text-center self-stretch">
                {data?.owner?.fullName}
              </div>
              <ILocalCircle fill="#F1DEE4" />
              <div className="kind font-roboto text-xs font-normal">
                {data?.owner?.kind === 2 ? "User" : "Expert"}
              </div>
              <ILocalCircle fill="#F1DEE4" />
              <div className="date font-roboto text-xs font-normal">
                {handleFormatTime(data.createdDate)}
              </div>
            </div>
            <div className="content font-roboto text-sm font-normal ">
              {data.commentContent}
            </div>
          </div>
          <div className=" xl:flex xl:flex-row xl:gap-4 mt-1">
            <IconFooter count={1} check={true}>
              <ILocalHeartComment fill="#A73574" className="p-[10px]" />
            </IconFooter>
            <IconFooter count={0} check={true}>
              <ILocalComment
                fill="#A73574"
                width={24}
                height={24}
                className="p-[10px]"
              />
            </IconFooter>
            <IconFooter check={false} handleClick={eventReply}>
              <ILocalReply fill="#1F1A1C" className="p-[10px]" />
            </IconFooter>
          </div>
        </div>
        <CommentSetting commentId={data.id} />
      </div>
      {/* <div className="flex flex-col ">
        {listChildComment?.data?.content?.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))}
        {active && <CommentForm id={postDetailId} parentId={data.id} />}
      </div> */}
    </div>
  );
};
CommentRight.propTypes = {
  data: PropTypes.object.isRequired,
  eventReply: PropTypes.func,
};
export default CommentRight;
