import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const NotificationCard2 = (props) => {
  dayjs.extend(relativeTime);

  const contentEvent = JSON.parse(props.event.content);
  const [content, setContent] = useState("");
  let newContent = "";
  useEffect(() => {
    switch (props.event.kind) {
      case 6:
        if (props.kind === 1) {
          setContent(
            "Your event " + contentEvent.courseTitle + " has been approved"
          );
        } else {
          newContent =
            "Your event " + contentEvent.courseTitle + " has been approved";

          if (newContent.length > 15) {
            newContent = newContent.substring(0, 30) + "...";
          }
          setContent(newContent);
        }

        break;

      default:
      // code block
    }
  }, []);

  return (
    <div className="flex flex-row justify-between hover:bg-[#fff8f8] py-2 cursor-pointer border-b border-[#ccc]">
      <div className="flex flex-row gap-3">
        {props.event.state === 0 ? (
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full "></div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full "></div>
          </div>
        )}
        <div className="flex flex-row gap-3 items-center ">
          <div className="w-10 h-10 ">
            <img
              src="https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_j7ZNkaSCeT.png"
              alt=""
              className="object-cover w-full h-full rounded-full "
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center">
              <p className="text-base font-normal font-roboto">{content}</p>
            </div>
            <div className="">
              <p className="text-sm font-normal font-roboto ">
                {dayjs(props.event.createdDate).format("DD MMM YYYY") +
                  " at " +
                  dayjs(props.event.createdDate).format("HH:mm a")}
              </p>
            </div>
          </div>
        </div>
      </div>
      {props.kind === 1 && (
        <div className="flex flex-col items-center justify-center gap-3">
          {props.event.state === 0 && (
            <div
              className="cursor-pointer hover:text-green-500"
              onClick={() => props.readNotification(props.event.id)}
            >
              <CheckCircleOutlined />
            </div>
          )}
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={() => props.deleteNotification(props.event.id)}
          >
            <DeleteOutlined />
          </div>
        </div>
      )}
    </div>
  );
};

NotificationCard2.propTypes = {
  event: PropTypes.object,
  readNotification: PropTypes.func,
  deleteNotification: PropTypes.func,
  kind: PropTypes.number,
};

export default NotificationCard2;
