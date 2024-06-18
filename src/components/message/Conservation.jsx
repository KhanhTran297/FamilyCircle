import { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Badge } from "antd";
import dayjs from "dayjs";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import relativeTime from "dayjs/plugin/relativeTime";
const Conservation = (props) => {
  const {
    ava,
    name,
    content,
    time,
    onlineUsers,
    id,
    conversationId,
    isActive,
    modifiedBy,
  } = props;
  const [active, setActive] = useState(false);
  let limit = 5;
  dayjs.extend(relativeTime);
  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const checkOnline = (uid) => {
    return onlineUsers
      ? onlineUsers.some((user) => user?.accountId == uid)
      : false;
  };
  const calculateTimeAgo = (timestamp) => {
    const postTime = dayjs(timestamp, "DD/MM/YYYY HH:mm:ss");
    const formattedDate = postTime.fromNow();
    return formattedDate;
  };
  const checkLastMessage = () => {
    let lessContent;
    if (content?.length > limit) {
      lessContent = content?.slice(0, limit) + "...";
    } else {
      lessContent = content;
    }
    if (accountProfile?.data?.email == modifiedBy) {
      return content == undefined ? "No message" : "You: " + lessContent;
    }
    return content == undefined ? "No message" : lessContent;
  };
  return (
    <div
      className={`flex pt-3 pb-3 pl-6 pr-6 items-center gap-2 self-stretch ${
        isActive && "bg-button-submit-light"
      } cursor-pointer hover:opacity-60 `}
      onClick={() => setActive(true)}
    >
      {/* <div className=" w-10 h-10 rounded-[20px]">
        <img src={ava} alt="" className=" w-full h-full rounded-[20px]" />
      </div> */}
      <Badge dot={checkOnline(id)} color="green" size="large">
        <Avatar shape="circle" src={ava} size="large" />
      </Badge>
      <div className=" flex flex-col items-start flex-[1_1_0]">
        <p
          className={`self-stretch ${
            isActive ? "text-white" : " text-light_surface_on_surface"
          }  font-roboto text-sm font-medium`}
        >
          {" "}
          {name}
        </p>
        <div className="flex flex-row flex-wrap justify-between gap-2 ">
          <p
            className={`h-5 flex-1 ${
              isActive ? "text-white" : " text-light_surface_on_surface"
            } font-roboto text-sm font-normal`}
            dangerouslySetInnerHTML={{ __html: checkLastMessage() }}
          ></p>
          <span
            className={`${
              isActive ? "text-white" : " text-light_surface_on_surface"
            } font-roboto text-sm font-normal`}
          >
            {content == undefined ? "" : calculateTimeAgo(time)}
          </span>
        </div>
      </div>
    </div>
  );
};

Conservation.propTypes = {
  ava: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.string,
  onlineUsers: PropTypes.array,
  id: PropTypes.any,
  modifiedBy: PropTypes.string,
};

export default Conservation;
