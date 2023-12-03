import { Input } from "antd";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";

const Right = () => {
  const socket = useRef(io("ws://localhost:8900"));
  const account = useGetFetchQuery(["accountProfile"]);
  // const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  });
  useEffect(() => {
    socket.current.emit("addUser", account?.data?.id);
    socket.current.on("getUsers", (user) => {
      console.log("user", user);
    });
  }, [account]);
  // console.log(account);
  return (
    <div className=" flex flex-col items-start flex-[1_1_0] self-stretch border-r border-solid border-r-[#F1DEE4]">
      <div className=" flex pt-3 pb-3 pl-4 pr-4 items-center self-stretch gap-2 border-b border-solid border-b-[#F1DEE4]">
        <div className=" w-10 h-10 rounded-[20px]">
          <img
            src="https://i.pinimg.com/236x/18/28/2f/18282f404ea132c3423e4ac178259b7b.jpg"
            alt=""
            className=" w-full h-full rounded-[20px]"
          />
        </div>
        <p className=" text-light_surface_on_surface font-roboto text-sm font-medium">
          Brooklyn Simmons
        </p>
      </div>
      <div className=" relative flex p-6 flex-col items-start gap-3 self-stretch h-full">
        <Message own={true} />
        <Message />
        <Message own={true} />
      </div>
      <div className=" h-16 flex pl-6 pr-6 items-center gap-[10px] self-stretch border-t border-solid border-t-[#f1DEE4]">
        <input
          placeholder="Text your message..."
          className=" border-none outline-none flex-[1_0_0] text-[#504348] font-roboto text-sm font-normal "
        ></input>
        <div className="flex w-10 h-10 p-[10px] flex-col justify-center items-center gap-[10px] rounded-[20px] hover:bg-bgButtonHover cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <mask
              id="mask0_1169_1014"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1169_1014)">
              <path
                d="M3 20V4L22 12L3 20ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17Z"
                fill="#1F1F1F"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Right;
