import { Avatar } from "antd";

import PropTypes from "prop-types";

const CommentLeft = ({ img, root, showReply, activeCol }) => {
  return (
    <div
      className={`flex justify-center  ${
        ((root && showReply) || activeCol) && "items-center flex-col gap-2"
      } `}
    >
      <Avatar
        src={
          img ||
          "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg"
        }
        className=" w-10 h-10 rounded-[40px] "
      />
      {((root && showReply) || activeCol) && (
        <div className=" w-[1px] flex-1 bg-[#F1DEE4]"></div>
      )}
    </div>
  );
};

CommentLeft.propTypes = {
  img: PropTypes.string.isRequired,
  root: PropTypes.bool.isRequired,
  showReply: PropTypes.bool,
  activeCol: PropTypes.bool,
};
export default CommentLeft;
