import useTheme from "../../hooks/useTheme";
import { ILocalDot } from "../svg/Dot";
import { ILocalMore } from "../svg/more";

const HeaderPost = () => {
  const { theme } = useTheme({});
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  return (
    <div className="flex flex-row w-full h-10 gap-2 xl:items-center">
      <div className="flex flex-col w-full h-5 gap-0 xl:flex-row xl:gap-2">
        <div className="flex flex-row gap-2">
          <p className="text-[#1F1A1C] font-medium text-sm font-roboto">
            Bessie Cooper
          </p>
          <div className="items-center hidden xl:flex">
            <ILocalDot fill="#F1DEE4" />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-[#1F1A1C] font-normal text-sm">Expert</p>
          <div className="flex items-center">
            <ILocalDot fill="#F1DEE4" />
          </div>
          <p className="text-[#1F1A1C] font-normal text-sm">Sep 21</p>
        </div>
      </div>
      <div className="flex  flex-col items-center justify-center rounded-[20px] hover:bg-tab hover:bg-opacity-[8%] cursor-pointer w-10 h-10 gap-[10px] p-[10px] self-end">
        <ILocalMore fill={textColor} />
      </div>
    </div>
  );
};

export default HeaderPost;
