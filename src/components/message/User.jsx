import PropTypes from "prop-types";
import { useState } from "react";

const User = (props) => {
  const { ava, name, content, time } = props;
  const [active, setActive] = useState(false);
  return (
    <div
      className={`flex pt-3 pb-3 pl-6 pr-6 items-center gap-2 self-stretch ${
        active && "bg-button-submit-light"
      } cursor-pointer hover:opacity-60 `}
      onClick={() => setActive(true)}
    >
      <div className=" w-10 h-10 rounded-[20px]">
        <img src={ava} alt="" className=" w-full h-full rounded-[20px]" />
      </div>
      <div className=" flex flex-col items-start flex-[1_1_0]">
        <p
          className={`self-stretch ${
            active ? "text-white" : " text-light_surface_on_surface"
          }  font-roboto text-sm font-medium`}
        >
          {" "}
          {name}
        </p>
        <div className="flex items-start gap-2 self-stretch">
          <p
            className={`h-5 flex-[1_1_0] ${
              active ? "text-white" : " text-light_surface_on_surface"
            } font-roboto text-sm font-normal`}
          >
            {content}
          </p>
          <span
            className={`${
              active ? "text-white" : " text-light_surface_on_surface"
            } font-roboto text-sm font-normal`}
          >
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};
User.propTypes = {
  ava: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.string,
};
export default User;
