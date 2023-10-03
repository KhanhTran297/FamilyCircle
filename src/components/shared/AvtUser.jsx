import PropTypes from "prop-types";
const AvtUser = ({ imageUrl }) => {
  const defaultImageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png";

  return (
    <div
      className="w-10 h-10  bg-cover rounded-[40px] bg-no-repeat "
      style={{
        backgroundImage: imageUrl
          ? `url(${imageUrl})`
          : `url(${defaultImageUrl})`,
        backgroundPosition: "-8.486px -32.653px",
        backgroundSize: "136.384% 181.845%",
      }}
    ></div>
  );
};
AvtUser.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
export default AvtUser;
