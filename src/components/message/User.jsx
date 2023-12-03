import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Badge, message } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { createConversationApi } from "../../api/conservation";

const User = (props) => {
  const { ava, name, content, time, onlineUsers, id } = props;
  const [active, setActive] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: createConversation } = useMutation({
    mutationKey: ["createConversation", id],
    mutationFn: createConversationApi,
    onSuccess: (data) => {
      message.success("create Conservation success");
      queryClient.invalidateQueries("listConversation");
    },
  });
  const checkOnline = (uid) => {
    return onlineUsers.some((user) => user.userId == uid);
  };

  const handleCreateConversation = () => {
    const data = {
      accountIds: [id],
      image: ava,
      kind: 1,
      lastMessage: "",
      name: name,
    };
    createConversation(data);
  };
  return (
    <div
      className={`flex pt-3 pb-3 pl-6 pr-6 items-center gap-2 self-stretch ${
        active && "bg-button-submit-light"
      } cursor-pointer hover:opacity-60 `}
      onClick={() => handleCreateConversation()}
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
            active ? "text-white" : " text-light_surface_on_surface"
          }  font-roboto text-sm font-medium`}
        >
          {" "}
          {name}
        </p>
        {/* <div className="flex items-start gap-2 self-stretch">
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
        </div> */}
      </div>
    </div>
  );
};
User.propTypes = {
  ava: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.string,
  onlineUsers: PropTypes.array,
  id: PropTypes.any,
};
export default User;
