import { ILocalCircle } from "../svg/circle";
import CommentFooter from "./CommentFooter";

import PropTypes from "prop-types";

const CommentBody = ({ fullName, kind, date, content }) => {
  return (
    <div className=" center xl:flex xl:flex-col xl:flex-auto ">
      <div className="body xl:flex xl:flex-col gap-1">
        <div className="title xl:flex xl:flex-row gap-2 text-center items-center">
          <div className="name font-roboto text-sm font-medium text-center self-stretch">
            {fullName}
          </div>
          <ILocalCircle fill="#F1DEE4" />
          <div className="kind font-roboto text-xs font-normal">
            {kind === 2 ? "User" : "Expert"}
          </div>
          <ILocalCircle fill="#F1DEE4" />
          <div className="date font-roboto text-xs font-normal">{date}</div>
        </div>
        <div className="content font-roboto text-sm font-normal ">
          {content}
        </div>
      </div>
      <CommentFooter />
    </div>
  );
};
CommentBody.propTypes = {
  fullName: PropTypes.string.isRequired,
  kind: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
export default CommentBody;
