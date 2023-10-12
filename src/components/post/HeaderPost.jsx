import dayjs from "dayjs";
import useTheme from "../../hooks/useTheme";
import { ILocalDot } from "../svg/Dot";
import { ILocalMore } from "../svg/more";
// import {relativeTime} from "dayjs/plugin/relativeTime";

import relativeTime from "dayjs/plugin/relativeTime";
const HeaderPost = (props) => {
  // var config = {
  //   thresholds: [{}],
  //   rounding: function () {},
  // };

  dayjs.extend(relativeTime);
  // var thresholds = [
  //   { l: "s", r: 1 },
  //   { l: "m", r: 1 },
  //   { l: "mm", r: 59, d: "minute" },
  //   { l: "h", r: 1 },
  //   { l: "hh", r: 23, d: "hour" },
  //   { l: "d", r: 1 },
  //   { l: "dd", r: 7, d: "day" },
  //   { l: "M", r: "DD MMM" },
  //   { l: "MM", r: 11, d: "DD MMM" },
  //   { l: "y", r: "DD MM YYYY" },
  //   { l: "yy", d: "year" },
  // ];
  const { theme } = useTheme({});
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const calculateTimeAgo = (timestamp) => {
    const now = dayjs("DD/MM/YYYY HH:mm:ss");
    const postTime = dayjs(timestamp, "DD/MM/YYYY HH:mm:ss");

    console.log(dayjs(postTime).fromNow());

    // if (minutesAgo < 60) {
    //   return `${minutesAgo} phút trước`;
    // } else if (hoursAgo < 24) {
    //   return `${hoursAgo} giờ trước`;
    // } else {
    //   const formattedDate = postTime.format("DD MMM");
    //   return formattedDate;
    // }
    const formattedDate = dayjs(postTime).fromNow();
    return formattedDate;
  };
  return (
    <div className="flex flex-row w-full h-10 gap-2 xl:items-center">
      <div className="flex flex-col w-full h-5 gap-0 xl:flex-row xl:gap-2">
        <div className="flex flex-row gap-2">
          <p className="text-[#1F1A1C] font-medium text-sm font-roboto">
            {props.fullname}
          </p>
          <div className="items-center hidden xl:flex">
            <ILocalDot fill="#F1DEE4" />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-[#1F1A1C] font-normal text-sm">
            {props.kind === 2 ? "User" : "Expert"}
          </p>
          <div className="flex items-center">
            <ILocalDot fill="#F1DEE4" />
          </div>
          <p className="text-[#1F1A1C] font-normal text-sm">
            {props.createdDate === props.modifiedDate
              ? calculateTimeAgo(props.createdDate) // Sử dụng hàm tính toán thời gian
              : "Edited on " + calculateTimeAgo(props.modifiedDate)}
          </p>
        </div>
      </div>
      <button className="flex  flex-col  items-center justify-center rounded-[20px] hover:bg-tab hover:bg-opacity-[8%] cursor-pointer w-10 h-10 gap-[10px] p-[10px] self-end">
        <ILocalMore fill={textColor} />
      </button>
    </div>
  );
};

export default HeaderPost;
