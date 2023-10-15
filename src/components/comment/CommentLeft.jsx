import { Avatar } from "antd";

import PropTypes from "prop-types";

const CommentLeft = ({ img }) => {
  return (
    <div className="left">
      <Avatar
        src={
          img ||
          "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg"
        }
        className=" w-10 h-10 rounded-[40px]"
      />
    </div>
  );
};

CommentLeft.propTypes = {
  img: PropTypes.string.isRequired,
};
export default CommentLeft;
