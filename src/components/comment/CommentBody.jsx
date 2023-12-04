import dayjs from "dayjs";
import { ILocalCircle } from "../svg/circle";

import PropTypes from "prop-types";

const CommentBody = ({ fullName, kind, dateCreate, dateModify, content }) => {
  const handleFormatTime = (time) => {
    const commentTime = dayjs(time, "DD/MM/YYYY HH:mm:ss");
    const timeFormat = dayjs(commentTime).fromNow();
    return timeFormat;
  };
  return (
    <div className="body xl:flex xl:flex-col gap-1">
      <div className="title xl:flex xl:flex-row gap-2 text-center items-center">
        <div className="font-roboto text-sm font-medium text-center self-stretch text-light_surface_on_surface">
          {fullName}
        </div>
        <ILocalCircle fill="#F1DEE4" />
        <div className="kind font-roboto text-xs font-normal text-light_surface_on_surface_variant">
          {kind === 2 ? "User" : "Expert"}
        </div>
        <ILocalCircle fill="#F1DEE4" />
        <div className="date font-roboto text-xs font-normal text-light_surface_on_surface_variant">
          {dateCreate === dateModify
            ? handleFormatTime(dateCreate)
            : "Edited " + handleFormatTime(dateModify)}
        </div>
      </div>
      {/* <div className="content font-roboto text-sm font-normal text-light_surface_on_surface ">
        {content}
      </div> */}
      <div
        className="w-full text-sm font-normal  read-more-read-less font-roboto break-all text-light_surface_on_surface"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};
CommentBody.propTypes = {
  fullName: PropTypes.string.isRequired,
  kind: PropTypes.number.isRequired,
  dateCreate: PropTypes.any.isRequired,
  dateModify: PropTypes.any.isRequired,
  content: PropTypes.string.isRequired,
};
export default CommentBody;
