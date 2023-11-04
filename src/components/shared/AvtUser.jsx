import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const AvtUser = ({ imageUrl, ownerId }) => {
  const navigate = useNavigate();
  const defaultImageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
  return (
    <div
      className="w-10 h-10  bg-cover rounded-[40px] bg-no-repeat cursor-pointer hover:opacity-60 "
      style={{
        backgroundImage: imageUrl
          ? `url(${imageUrl})`
          : `url(${defaultImageUrl})`,
      }}
      onClick={() => {
        navigate(`/profile/${ownerId}`);
      }}
    ></div>
  );
};
AvtUser.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
export default AvtUser;
