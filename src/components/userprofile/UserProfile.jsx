import PropTypes from "prop-types";
import BodyProfile from "./BodyProfile";

const UserProfile = ({ data }) => {
  return (
    <div className=" w-full flex flex-col items-start ">
      <div className="coverimg h-[190px] self-stretch bg-[#E1E1E1]"></div>
      <BodyProfile data={data} />
    </div>
  );
};

UserProfile.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UserProfile;
