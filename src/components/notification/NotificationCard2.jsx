import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { getProfileAccountByIdApi } from "../../api/account";
import { useNavigate } from "react-router-dom";

const NotificationCard2 = (props) => {
  dayjs.extend(relativeTime);
  const [tempdata, setTempData] = useState();
  const queryClient = useQueryClient();
  const contentEvent = JSON.parse(props.event.content);
  console.log("contentEvent", props.event.content);
  const [content, setContent] = useState("");
  let newContent = "";
  const navigate = useNavigate();
  const time = dayjs(props.event.createdDate, "DD/MM/YYYY HH:mm:ss ").toDate();
  const handleNavigate = (kind) => {
    if (
      kind === 3 ||
      kind === 2 ||
      kind === 1 ||
      kind === 9 ||
      kind === 7 ||
      kind === 8
    ) {
      navigate(`/post/${contentEvent.postId}`);
    } else if (kind === 4) {
      navigate(`/post/${contentEvent.postId}`);
    } else if (kind === 5) {
      navigate(`/profile/${contentEvent.userFollowingId}`);
    } else if (kind === 6) {
      navigate(`/schedule/${contentEvent.courseId}`);
    }
  };
  const handleImage = (kind) => {
    if (kind === 6) {
      return "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_j7ZNkaSCeT.png";
    } else if (kind === 1) {
      return contentEvent?.communityImage;
    } else {
      return contentEvent.accountAvatar;
    }
  };

  useEffect(() => {
    switch (props.event.kind) {
      case 1:
        queryClient
          .fetchQuery({
            queryKey: ["profileUserById", contentEvent.accountId],
            queryFn: (params) => getProfileAccountByIdApi(params),
          })
          .then((res) => {
            setTempData(res?.data);
            return res?.data;
          });

        if (props.kind === 1) {
          setContent(
            contentEvent.accountName +
              " posted in " +
              contentEvent.communityName +
              " : " +
              contentEvent.postTitle
          );
        } else {
          newContent =
            contentEvent.accountName +
            " posted in " +
            contentEvent.communityName +
            " : " +
            contentEvent.postTitle;

          if (newContent.length > 15) {
            newContent = newContent.substring(0, 30) + "...";
          }
          setContent(newContent);
        }

        break;
      case 2:
        queryClient
          .fetchQuery({
            queryKey: ["profileUserById", contentEvent.accountId],
            queryFn: (params) => getProfileAccountByIdApi(params),
          })
          .then((res) => {
            setTempData(res?.data);
            return res?.data;
          });

        if (props.kind === 1) {
          setContent(
            contentEvent.accountName +
              " commented " +
              contentEvent.commentContent +
              " on your post "
          );
        } else {
          newContent =
            contentEvent.accountName +
            " commented " +
            contentEvent.commentContent +
            " on your post ";

          if (newContent.length > 15) {
            newContent = newContent.substring(0, 30) + "...";
          }
          setContent(newContent);
        }

        break;
      case 3:
        queryClient
          .fetchQuery({
            queryKey: ["profileUserById", contentEvent.accountId],
            queryFn: (params) => getProfileAccountByIdApi(params),
          })
          .then((res) => {
            setTempData(res?.data);
            return res?.data;
          });

        if (props.kind === 1) {
          setContent(contentEvent.accountName + "  liked your post");
        } else {
          newContent = contentEvent.accountName + "  liked your post";

          if (newContent.length > 15) {
            newContent = newContent.substring(0, 30) + "...";
          }
          setContent(newContent);
        }

        break;
      case 4:
        queryClient
          .fetchQuery({
            queryKey: ["profileUserById", contentEvent.accountId],
            queryFn: (params) => getProfileAccountByIdApi(params),
          })
          .then((res) => {
            setTempData(res?.data);
            return res?.data;
          });

        if (props.kind === 1) {
          setContent(
            contentEvent.accountName +
              "  liked your comment: " +
              contentEvent.commentContent
          );
        } else {
          newContent =
            contentEvent.accountName +
            "  liked your comment: " +
            contentEvent.commentContent;

          if (newContent.length > 15) {
            newContent = newContent.substring(0, 30) + "...";
          }
          setContent(newContent);
        }

        break;
      case 5:
        queryClient
          .fetchQuery({
            queryKey: ["profileUserById", contentEvent.userFollowingId],
            queryFn: (params) => getProfileAccountByIdApi(params),
          })
          .then((res) => {
            setTempData(res?.data);
            return res?.data;
          });

        if (props.kind === 1) {
          setContent(contentEvent.userFollowingName + "  followed you");
        } else {
          newContent = contentEvent.userFollowingName + "  followed you";

          if (newContent.length > 15) {
            newContent = newContent.substring(0, 30) + "...";
          }
          setContent(newContent);
        }

        break;

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
      case 7:
        if (props.kind === 1) {
          setContent(
            contentEvent.accountName +
              " mentioned you in a comment in their post"
          );
        } else {
          newContent =
            contentEvent.accountName +
            " mentioned you in a comment in their post";

          if (newContent.length > 15) {
            newContent = newContent.substring(0, 30) + "...";
          }
          setContent(newContent);
        }

        break;
      case 8:
        if (props.kind === 1) {
          setContent(
            contentEvent.accountName + " replied you in a comment in their post"
          );
        } else {
          newContent =
            contentEvent.accountName +
            " replied you in a comment in their post";

          if (newContent.length > 15) {
            newContent = newContent.substring(0, 30) + "...";
          }
          setContent(newContent);
        }

        break;
      case 9:
        queryClient
          .fetchQuery({
            queryKey: ["profileUserById", contentEvent.accountId],
            queryFn: (params) => getProfileAccountByIdApi(params),
          })
          .then((res) => {
            setTempData(res?.data);
            return res?.data;
          });

        if (props.kind === 1) {
          setContent(
            contentEvent.accountName +
              " posted in " +
              contentEvent.communityName +
              " : " +
              contentEvent.postTitle
          );
        } else {
          newContent =
            contentEvent.accountName +
            " posted in " +
            contentEvent.communityName +
            " : " +
            contentEvent.postTitle;

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
      <div
        className="flex flex-row gap-3"
        onClick={() => handleNavigate(props?.event?.kind)}
      >
        {props.event.state === 0 ? (
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full "></div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full "></div>
          </div>
        )}
        <div className="flex flex-row items-center gap-3 ">
          <div className="w-10 h-10 ">
            <img
              src={handleImage(props?.event?.kind)}
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
                {dayjs(time).format("DD MMM YYYY") +
                  " at " +
                  dayjs(time).format("HH:mm a")}
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
