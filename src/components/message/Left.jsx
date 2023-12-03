import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import User from "./User";
import { useQuery } from "@tanstack/react-query";
import { getListFollowerApi, getListFollowingApi } from "../../api/follow";
import { useEffect, useRef, useState } from "react";

const Left = () => {
  const [friendAccount, setFriendAccount] = useState([]);

  // const [socket, setSocket] = useState(null);

  const { data: listFollower } = useQuery({
    queryKey: ["listFolower"],
    queryFn: getListFollowerApi,
  });
  const { data: listFollowing } = useQuery({
    queryKey: ["listFollowing"],
    queryFn: getListFollowingApi,
  });
  const commonAccounts = listFollower?.data?.content.filter((account) => {
    return listFollowing?.data?.content.some(
      (followingAccount) => followingAccount.account.id === account.follower.id
    );
  });

  // setFriendAccount(commonAccounts);
  // useEffect(() => {
  //   const commonAccounts = listFollower?.data?.content.filter((account) => {
  //     return listFollowing?.data?.content.some(
  //       (followingAccount) =>
  //         followingAccount.account.id === account.follower.id
  //     );
  //   });

  //   setFriendAccount(commonAccounts);
  // }, []);
  useEffect(() => {
    socket.current.emit("addUser", account?.data?.id);
    socket.current.on("getUsers", (user) => {
      console.log("user", user);
    });
  }, [account]);

  return (
    <div className=" xl:w-[368px] flex flex-col items-start gap-4 self-stretch border-r border-l border-solid border-r-[#F1DEE4]">
      <div className=" xl:h-16 pl-6 pr-6 justify-center items-start self-stretch">
        <p className=" font-roboto text-[22px] font-medium leading-7 text-[#1F1A1C]">
          Chat
        </p>
        <p className=" font-roboto text-sm font-normal text-light_surface_on_surface">
          Select a user to start a chat
        </p>
      </div>
      <div className=" flex pl-6 pr-6 flex-col gap-[10px] self-stretch items-start">
        <Input
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
          className=" rounded-[100px] flex gap-[10px] "
        ></Input>
      </div>
      <div className="flex flex-col items-start self-stretch">
        {commonAccounts?.map((account) => {
          return (
            <User
              key={account?.follower?.id}
              id={account?.follower?.id}
              ava={account?.follower?.avatar}
              name={account?.follower?.fullName}
              content={"You: Lot of young boy at this age get...."}
              time="3m"
              isOnline={true}
            />
          );
        })}
        {/* <User
          ava="https://i.pinimg.com/236x/81/e8/f8/81e8f8beecbdd95391e6671d39a37041.jpg"
          name="Ronald Richards"
          content="You: Lot of young boy at this age get...."
          time="3m"
        />
        <User
          ava="https://i.pinimg.com/236x/76/cb/a8/76cba81706e839c7a19ffda51ca6be71.jpg"
          name="Ronald Fox"
          content="You: Hi there"
          time="5h"
        />
        <User
          ava="https://i.pinimg.com/236x/b7/38/e1/b738e18557bbfb2b5c81e7f46cdae5d7.jpg"
          name="Jenny Wilson"
          content="That's awesome!"
          time="3d"
        />
        <User
          ava="https://i.pinimg.com/236x/18/28/2f/18282f404ea132c3423e4ac178259b7b.jpg"
          name="Brooklyn Simmons"
          content="You: See you there, bye bye"
          time="3w"
        />
        <User
          ava="https://i.pinimg.com/236x/65/b7/a7/65b7a763b315fd6780f50de07506095e.jpg"
          name="Bessie Cooper"
          content="Hey"
          time="34w"
        /> */}
      </div>
    </div>
  );
};

export default Left;
