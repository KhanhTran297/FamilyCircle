import useTheme from "../../hooks/useTheme";
import AvtUser from "./AvtUser";
import { ILocalMore } from "../svg/more";

const UserSetting = () => {
  const { theme } = useTheme({});
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  return (
    <div className="items-center self-stretch hidden gap-2 xl:flex">
      <AvtUser imageUrl="https://static.wixstatic.com/media/9d8ed5_06bc8fa9e7c349c3bd0f5e954cf3ad5a~mv2.jpg/v1/fit/w_600,h_600,al_c,q_20,enc_auto/file.jpg" />
      <div className="xl:h-9 xl:w-[136px]">
        <p className="text-[#1F1A1C] font-medium items-center text-sm dark:text-[#CEC4C6] font-roboto">
          Lê Cao Tuệ
        </p>
        <p className="text-[#1F1A1C] font-normal text-xs dark:text-[#CEC4C6] font-roboto">
          Expert
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-[20px] hover:bg-tab hover:bg-opacity-[8%] cursor-pointer w-10 h-10 gap-[10px] p-[10px]">
        <ILocalMore fill={textColor} />
      </div>
    </div>
  );
};

export default UserSetting;
