import dayjs from "dayjs";
import useTheme from "../../hooks/useTheme";
import { ILocalDot } from "../svg/Dot";
import { ILocalMore } from "../svg/more";
// import {relativeTime} from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dropdown, Modal } from "antd";
import { Fragment, useState } from "react";
import CreatePostModal from "../modal/CreatePostModal";
import UseCookie from "../../hooks/UseCookie";
import { useSelector } from "react-redux";
import useAccount from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import { ILocalReport } from "../svg/report";
import { ILocalAddBookmark } from "../svg/addtobookmark";
import { ILocalFollow } from "../svg/follow";
const HeaderPost = (props) => {
  dayjs.extend(relativeTime);
  const navigate = useNavigate();

  const { theme } = useTheme({});
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const calculateTimeAgo = (timestamp) => {
    const now = dayjs("DD/MM/YYYY HH:mm:ss");
    const postTime = dayjs(timestamp, "DD/MM/YYYY HH:mm:ss");

    // console.log(dayjs(postTime).fromNow());

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoggedIn } = UseCookie();
  const selector = useSelector((state) => state.account);
  const userAccount = selector.account;
  const selectorExpert = useSelector((state) => state.expert);
  const userExpert = selectorExpert.expert;
  const { getProfileAccount, getProfileExpertAccount } = useAccount();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const checkAccount = () => {
    if (isLoggedIn()) {
      if (!userAccount) {
        getProfileAccount();
      }
      if (!userExpert) {
        getProfileExpertAccount();
      }
      setShowCreatePost(true);
    } else {
      navigate("/");
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        checkAccount();
        break;
      case "2":
        showModal();
        break;
      default:
        break;
    }
  };
  const items1 = [
    {
      key: "1",
      label: (
        <button className="items">
          <p className="text-sm font-medium font-roboto">Edit post</p>
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button className="items">
          <p className="text-sm font-medium font-roboto">Delete post</p>
        </button>
      ),
    },
  ];
  const items2 = [
    {
      key: "1",
      label: (
        <button className="flex flex-row items-center gap-4 items">
          <ILocalReport className="shrink-0" />
          <p className="text-sm font-medium font-roboto">Report</p>
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button className="flex flex-row items-center gap-4 items">
          <ILocalFollow fill="#1F1A1C" />
          <p className="text-sm font-medium font-roboto">Follow</p>
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button className="flex flex-row items-center gap-4 items">
          <ILocalAddBookmark fill="#1F1A1C" />
          <p className="text-sm font-medium font-roboto">Add to bookmark</p>
        </button>
      ),
    },
  ];
  return (
    <Fragment>
      <CreatePostModal
        id={props.id}
        //   avatar={userAccount.userAvatar}
        fullname={userAccount?.userFullName || userExpert?.expertFullName}
        kind={userAccount?.userKind || userExpert?.expertKind}
        open={showCreatePost}
        handleClose={() => setShowCreatePost(false)}
        isUpdate={true}
        content={props.content}
      />
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
        <Dropdown
          menu={{
            items:
              props.idowner === userAccount?.id ||
              props.idowner === userExpert?.id
                ? items1
                : items2,
            onClick,
          }}
          placement="bottomRight"
        >
          <button className="flex items  flex-col  items-center justify-center rounded-[20px] hover:bg-tab hover:bg-opacity-[8%] cursor-pointer w-10 h-10 gap-[10px] p-[10px] self-end">
            <ILocalMore fill={textColor} />
          </button>
        </Dropdown>
        <Modal
          title="Confirm delete"
          open={isModalVisible}
          onCancel={handleCancel}
          okText="Delete"
          okType="danger"
          className="publish"
          onOk={props.onDelete}
          style={{
            fontFamily: "Roboto, sans-serif",
          }}
          centered
        >
          Are you sure you want to delete this post?
        </Modal>
      </div>
    </Fragment>
  );
};
HeaderPost.propTypes = {
  id: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  kind: PropTypes.number.isRequired,
  createdDate: PropTypes.string.isRequired,
  modifiedDate: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
};
export default HeaderPost;
