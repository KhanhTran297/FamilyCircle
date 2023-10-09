import PropTypes from "prop-types";
const AvtUser = ({ imageUrl }) => {
  const defaultImageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

  return (
    <div
      className="w-10 h-10  bg-cover rounded-[40px] bg-no-repeat "
      style={{
        backgroundImage: imageUrl
          ? `url(${imageUrl})`
          : `url(${defaultImageUrl})`,
      }}
    ></div>
  );
};
AvtUser.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
export default AvtUser;
