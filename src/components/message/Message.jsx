import dayjs from "dayjs";
import localLizedFormat from "dayjs/plugin/localizedFormat";
const Message = ({ own, message }) => {
  dayjs.extend(localLizedFormat);
  const handleFormatDay = (date) => {
    const rawtime = dayjs(date, "DD/MM/YYYY HH:mm:ss");
    const formatTime = dayjs(rawtime["$d"]).format("LT");
    return formatTime;
  };
  return (
    <div
      className={`flex flex-col gap-1  ${
        own ? " items-end" : " items-start"
      } w-full`}
    >
      <div className={` flex flex-col gap-1  ${own ? " left" : " right"}`}>
        <div
          className={`  flex  h-9 pl-4 pr-4 items-center w-max ${
            own
              ? "rounded-messageOwn bg-button-submit-light justify-end "
              : " rounded-messageOther bg-[#FCF1F3] justify-start "
          } `}
        >
          <p
            className={` ${
              own ? " text-[#fff]" : " text-light_surface_on_surface"
            } font-roboto text-sm font-normal`}
          >
            {message?.content}
          </p>
        </div>
      </div>
      <div
        className={`flex pr-4 pl-4  gap-[10px] ${
          own ? " justify-end" : " justify-start "
        }`}
      >
        {" "}
        <p className=" font-roboto text-xs font-normal text-light_surface_on_surface_variant">
          {handleFormatDay(message?.createdDate)}
        </p>
      </div>
    </div>
  );
};
export default Message;
