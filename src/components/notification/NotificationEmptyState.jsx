import PropTypes from "prop-types";
import { ILocalEmptyNotification } from "../svg/emptynotification";

const NotificationEmptyState = (props) => {
  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-4">
      <div className="">
        {/* <img
          src="https://s3.ap-southeast-1.amazonaws.com/socialavatar/AVATAR_rLZv7I0omc.png"
          alt=""
        /> */}
        <ILocalEmptyNotification className={props.css} />
      </div>
      <div className="flex flex-row justify-center items-center">
        <p className=" font-roboto font-semibold text-lg">
          No notifications right now!!!
        </p>
      </div>
    </div>
  );
};

NotificationEmptyState.propTypes = {
  css: PropTypes.string,
};

export default NotificationEmptyState;
