import PropTypes from "prop-types";
const AvtUser = ({ imageUrl }) => {
  const defaultImageUrl = "public/defaultavatar.jpg";

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
