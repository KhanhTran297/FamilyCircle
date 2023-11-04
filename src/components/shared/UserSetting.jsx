import useTheme from "../../hooks/useTheme";
import AvtUser from "./AvtUser";
import { ILocalMore } from "../svg/more";
import UseCookie from "../../hooks/UseCookie";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";

const UserSetting = () => {
  const { removeToken } = UseCookie();

  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const navigate = useNavigate();

  //methods
  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        handleLogout();
        break;
      default:
        break;
    }
  };
  const items = [
    {
      label: (
        <button className="w-12 h-12">
          <p className="text-sm font-medium font-roboto">Log out</p>
        </button>
      ),
      key: "1",
    },
  ];
  const { theme } = useTheme({});

  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  return (
    <div className="items-center self-stretch hidden gap-2 desktop:flex">
      <AvtUser />
      <div className="desktop:h-9 desktop:w-[136px]">
        <p className="text-[#1F1A1C] font-medium items-center text-sm dark:text-[#CEC4C6] font-roboto">
          {/* {userAccount?.userFullName || userExpert?.expertFullName} */}
          {accountProfile?.data?.fullName}
        </p>
        <p className="text-[#1F1A1C] font-normal text-xs dark:text-[#CEC4C6] font-roboto">
          {accountProfile?.data?.kind === 2 ? "User" : "Expert"}
          {/* {profileAccount?.data?.result ? "User" : "Expert"} */}
        </p>
      </div>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
        placement="topRight"
      >
        <div
          className="flex flex-col items-center justify-center rounded-[20px] hover:bg-tab hover:bg-opacity-[8%] cursor-pointer w-10 h-10 gap-[10px] p-[10px]"
          onClick={(e) => e.preventDefault()}
        >
          <ILocalMore fill={textColor} />
        </div>
      </Dropdown>
    </div>
  );
};

export default UserSetting;
