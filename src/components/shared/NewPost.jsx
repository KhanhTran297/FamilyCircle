import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import UseCookie from "../../hooks/UseCookie";
import useAccount from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../modal/CreatePostModal";
import { ILocalPost } from "../svg/post";
import useTheme from "../../hooks/useTheme";
import { ILocalArrowDropDown } from "../svg/arrow_drop_down";
import { ILocalHome } from "../svg/home";
import { Dropdown, Space } from "antd";
import { ILocalForum } from "../svg/forum";
import useClickOutSide from "../../hooks/useClickOutSide";

const NewPost = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedKind, setSelectedKind] = useState("");
  const { isLoggedIn } = UseCookie();
  const { getProfileAccount, getProfileExpertAccount } = useAccount();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.account);
  const userAccount = selector.account;
  const selectorExpert = useSelector((state) => state.expert);
  const userExpert = selectorExpert.expert;
  const { theme } = useTheme({});
  const postColor = theme === "dark" ? "#FFD8E8" : "#3D0027";
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const { show, setShow, nodeRef } = useClickOutSide();
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

  const toggleDropdown = () => {
    setShow(!show);
  };

  const handleOptionClick = (option) => {
    checkAccount();
    setSelectedKind(option);
    setShow(false);
  };
  return (
    <Fragment ref={nodeRef}>
      <CreatePostModal
        //   avatar={userAccount.userAvatar}
        fullname={userAccount?.userFullName || userExpert?.expertFullName}
        kind={userAccount?.userKind || userExpert?.expertKind}
        open={showCreatePost}
        handleClose={() => setShowCreatePost(false)}
        isUpdate={false}
        selectedKind={selectedKind} // Fixed: removed colon
      />
      <button
        className={` fixed bottom-[56px] right-0 m-4  xl:m-0 xl:top-0 z-auto xl:left-0 xl:relative   ${
          userExpert ? "xl:w-[164px]" : "xl:w-[136px]"
        } h-14 w-14      rounded-[28px]  xl:pl-4 xl:pt-[10px] xl:pb-[10px] bg-[#FFD8E8] dark:bg-[#772956]  `}
        {...(userAccount ? { onClick: checkAccount } : {})}
        // onClick={checkAccount}
      >
        <div
          className=" xl:width-[96px] xl:h-9 flex items-center xl:gap-3 justify-center xl:justify-normal"
          {...(userExpert ? { onClick: toggleDropdown } : {})}
        >
          <div className="flex flex-col items-center justify-center w-6 h-6 xl:justify-normal ">
            <ILocalPost fill={postColor} />
          </div>

          <div>
            <p
              className={`hidden xl:block font-medium text-${textColor} text-sm font-roboto z-10`}
            >
              New Post
            </p>
          </div>

          {userExpert ? (
            <button
              onClick={toggleDropdown}
              className="hidden xl:block"
              ref={nodeRef}
            >
              <ILocalArrowDropDown fill="#1F1F1F" />
            </button>
          ) : (
            ""
          )}
        </div>
      </button>
      {show && (
        <div className="fixed w-[176px]  z-50 bottom-[144px] right-6 xl:right-auto xl:top-[175px] h-[112px] py-2 rounded-lg shadow-modal inline-flex flex-col items-start bg-[#FFF] transition-all   ">
          <button
            onClick={() => handleOptionClick("1")}
            className="flex flex-row items-center w-full h-12 gap-4 px-4 hover:bg-menuOption"
          >
            <ILocalHome fill={textColor} />
            <p className="text-sm font-medium font-roboto">Post to Home</p>
          </button>
          <button
            className="flex flex-row items-center w-full h-12 gap-4 px-4 hover:bg-menuOption"
            onClick={() => handleOptionClick("2")}
          >
            <ILocalForum fill={textColor} />
            <p className="text-sm font-medium font-roboto ">Post to Forum</p>
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default NewPost;
