import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Message from "../../components/message/Message";
import { Input, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import User from "../../components/message/User";
import { ILocalArrowLeft } from "../../components/svg/arrow_left";
import { getListAccountClientApi } from "../../api/account";
import Conservation from "../../components/message/Conservation";
import {
  getConversationByIdApi,
  listConversationApi,
} from "../../api/conservation";
import { listMessageinConversationApi } from "../../api/message";
import useMessageMutate from "../../hooks/useMutate/useMessageMutate";
import { useLocation, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { socket } from "../../hooks/useSocket";

const MessagePage = () => {
  // const socket = useRef(io("ws://localhost:8900"));
  const account = useGetFetchQuery(["accountProfile"]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messageRef = useRef();
  const [isSearch, setIsSearch] = useState(false);
  const [params, setParams] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [listMessageState, setListMessageState] = useState([]);
  const [socketMessage, setSocketMessage] = useState(null);
  const location = useLocation();
  const [listConversationState, setListConversationState] = useState([]);
  const conversationId = location.search.split("=")[1] || null;
  const { sendMesssage } = useMessageMutate();
  const { data: listFriend, isLoading: loadListFriend } = useQuery({
    queryKey: ["listFriend", params],
    queryFn: getListAccountClientApi,
  });
  const { data: conversationDetail, refetch: getConversation } = useQuery({
    queryKey: ["ConversationDetail", conversationId],
    queryFn: (queryKey) =>
      getConversationByIdApi(queryKey).then((res) => {
        return res.data;
      }),
    enabled: conversationId ? true : false,
  });

  const { data: listConversation, refetch: refetchListConversation } = useQuery(
    {
      queryKey: ["listConversation"],
      queryFn: () =>
        listConversationApi().then((res) => {
          setListConversationState(res.data.content);
          return res.data.content;
        }),
    }
  );
  const { data: listMessage } = useQuery({
    queryKey: ["listMessageinConversation", conversationId],
    queryFn: (queryKey) =>
      listMessageinConversationApi(queryKey).then((res) => {
        console.log("res", res);

        if (res.data.totalElements == 0) {
          setListMessageState([]);
        } else {
          const reversedArray = res?.data?.content
            ? [...res.data.content].reverse()
            : [];

          setListMessageState(reversedArray);
        }
        return res.data.totalElements == 0 ? [] : res?.data?.content.reverse();
      }),
    enabled: conversationId ? true : false,
  });

  const handleSearch = (e) => {
    if (e.code === "Enter") {
      setParams(e.target.value);
    }
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    const receiverId =
      conversationDetail?.accountList[0]?.account.id == account?.data?.id
        ? conversationDetail?.accountList[1]?.account.id
        : conversationDetail?.accountList[0]?.account.id;
    if (messageRef.current.value == "") return;
    socket.emit("sendMessage", {
      senderId: account?.data?.id,
      id: receiverId,
      content: messageRef.current.value,
      conversationId: conversationDetail?.id,
      status: 1,
      createdDate: dayjs().format("DD//MM/YYYY HH:mm:ss"),
      modifiedDate: dayjs().format("DD//MM//YYYY HH:mm:ss"),
    });
    sendMesssage({
      conversationId: conversationId,
      content: messageRef.current.value,
    }).then(() => {
      e.target.reset();
    });
  };
  useEffect(() => {
    // socket.current = io("ws://localhost:8900");
    socket.on("getMessage", (data) => {
      setSocketMessage({
        senderId: data.senderId,
        content: data.content,
        id: data.id,
        conversationId: data.conversationId,
        status: 1,
        createdDate: data.createdDate,
        modifiedDate: data.modifiedDate,
      });
    });
  }, []);
  useEffect(() => {
    if (socketMessage) {
      const checkaccount = conversationDetail?.accountList.find(
        (Conversationaccount) => {
          return Conversationaccount?.account.id == socketMessage?.senderId;
        }
      )
        ? true
        : false;
      if (checkaccount) {
        setListMessageState((prev) => [...prev, socketMessage]);
      }
    }
  }, [socketMessage]);
  useEffect(() => {
    refetchListConversation();
  }, [listMessageState]);
  useEffect(() => {
    socket.emit("addUserOnline", account?.data?.id);
    socket.on("getUsersOnline", (user) => {
      setOnlineUsers(user);
    });
    // setOnlineUsers(JSON.parse(listOnlineUsers));
  }, [account]);
  return (
    <div className="w-full xl:w-[1160px] flex flex-row h-screen">
      {/* <Left /> */}
      <div className=" xl:w-[368px] flex flex-col items-start gap-4 self-stretch border-r border-l border-solid border-r-[#F1DEE4]">
        <div className=" xl:h-16 pl-6 pr-6 justify-center items-start self-stretch">
          <p className=" font-roboto text-[22px] font-medium leading-7 text-[#1F1A1C]">
            Chat
          </p>
          <p className=" font-roboto text-sm font-normal text-light_surface_on_surface">
            Select a user to start a chat
          </p>
        </div>
        <div className=" flex flex-row pl-6 pr-6  gap-[10px] self-stretch  items-center">
          {isSearch && (
            <div onClick={() => setIsSearch(false)} className=" cursor-pointer">
              <ILocalArrowLeft fill="#ccc" />
            </div>
          )}
          <Input
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
            className=" rounded-[100px] flex gap-[10px] "
            onClickCapture={() => setIsSearch(true)}
            onKeyDown={(e) => {
              handleSearch(e);
            }}
            onChange={(e) => {
              setTimeout(() => {
                setParams(e.target.value || null);
              }, 1000);
            }}
          ></Input>
        </div>
        <div className="flex flex-col items-start self-stretch">
          {isSearch ? (
            loadListFriend ? (
              <div className="flex pt-3 pb-3 pl-6 pr-6 items-center gap-2 self-stretch">
                {" "}
                <Spin className="flex pt-3 pb-3 pl-6 pr-6 items-center gap-2 self-stretch w-full justify-center" />
              </div>
            ) : (
              listFriend?.data?.content?.map((account) => {
                return (
                  <User
                    key={account?.id}
                    id={account?.id}
                    ava={account?.avatar}
                    name={account?.fullName}
                    onlineUsers={onlineUsers}
                  />
                );
              })
            )
          ) : (
            listConversationState?.map((conservation) => {
              const checkaccount =
                conservation?.accountList[0]?.account["id"] ==
                account?.data?.id;
              return (
                <div
                  key={conservation?.id}
                  onClick={() => setSearchParams({ id: conservation?.id })}
                  className={`w-full `}
                >
                  <Conservation
                    key={conservation?.id}
                    id={
                      checkaccount
                        ? conservation?.accountList[1]?.account["id"]
                        : conservation?.accountList[0]?.account["id"]
                    }
                    conversationId={conservation?.id}
                    ava={
                      checkaccount
                        ? conservation?.accountList[1]?.account["avatar"]
                        : conservation?.accountList[0]?.account["avatar"]
                    }
                    name={
                      checkaccount
                        ? conservation?.accountList[1]?.account["fullName"]
                        : conservation?.accountList[0]?.account["fullName"]
                    }
                    content={conservation?.lastMessage}
                    time={conservation?.modifiedDate}
                    modifiedBy={conservation?.modifiedBy}
                    onlineUsers={onlineUsers}
                    isActive={conversationId == conservation?.id}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* <Right /> */}
      {conversationDetail ? (
        <div className=" flex flex-col items-start flex-[1_1_0] self-stretch border-r border-solid border-r-[#F1DEE4]">
          <div className=" flex pt-3 pb-3 pl-4 pr-4 items-center self-stretch gap-2 border-b border-solid border-b-[#F1DEE4]">
            <div className=" w-10 h-10 rounded-[20px]">
              <img
                src={
                  conversationDetail?.accountList[0]?.account.id ==
                  account?.data?.id
                    ? conversationDetail?.accountList[1]?.account?.avatar
                    : conversationDetail?.accountList[0]?.account?.avatar
                }
                alt=""
                className=" w-full h-full rounded-[20px]"
              />
            </div>
            <p className=" text-light_surface_on_surface font-roboto text-sm font-medium">
              {conversationDetail?.accountList[0]?.account.id ==
              account?.data?.id
                ? conversationDetail?.accountList[1]?.account?.fullName
                : conversationDetail?.accountList[0]?.account?.fullName}
            </p>
          </div>
          <div className=" relative flex p-6 flex-col items-start gap-3 self-stretch h-full overflow-y-scroll ">
            {listMessageState?.map((message) => {
              return (
                <Message
                  key={message?.id}
                  own={message?.senderId == account?.data?.id}
                  message={message}
                />
              );
            })}
          </div>
          <div className=" h-16 flex pl-6 pr-6 items-center gap-[10px] self-stretch border-t border-solid border-t-[#f1DEE4]">
            <form className=" w-full" onSubmit={(e) => handleSendMessage(e)}>
              <input
                ref={messageRef}
                placeholder="Text your message..."
                className=" border-none outline-none flex-[1_0_0] text-[#504348] font-roboto text-sm font-normal w-full "
                // onKeyDown={(e) => {
                //   handleSendMessage(e);
                // }}
              ></input>
            </form>

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
      ) : (
        <div className=" flex flex-col items-center justify-center flex-[1_1_0] self-stretch border-r border-solid border-r-[#F1DEE4]">
          <div className=" font-roboto text-base font-medium text-light_surface_on_surface_variant">
            Let's start some conversations
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage;
