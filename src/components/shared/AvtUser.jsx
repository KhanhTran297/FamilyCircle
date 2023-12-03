import { Avatar, Badge } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const AvtUser = ({ imageUrl, ownerId }) => {
  const navigate = useNavigate();
  const listOnlineUsers = localStorage.getItem("user");
  const defaultImageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
  const checkOnline = (uid) => {
    return JSON.parse(listOnlineUsers).some((user) => user?.accountId == uid);
  };

  return (
    // <div
    //   className="w-10 h-10  bg-cover rounded-[40px] bg-no-repeat cursor-pointer hover:opacity-60 "
    //   style={{
    //     backgroundImage: imageUrl
    //       ? `url(${imageUrl})`
    //       : `url(${defaultImageUrl})`,
    //   }}
    //   onClick={() => {
    //     navigate(`/profile/${ownerId}`);
    //   }}
    // ></div>
    <Badge
      dot={checkOnline(ownerId)}
      color="green"
      size="large"
      className=" cursor-pointer hover:opacity-60"
      onClick={() => {
        navigate(`/profile/${ownerId}`);
      }}
    >
      <Avatar shape="circle" src={imageUrl || defaultImageUrl} size="large" />
    </Badge>
  );
};
AvtUser.propTypes = {
  imageUrl: PropTypes.string,
  ownerId: PropTypes.number,
};
export default AvtUser;
