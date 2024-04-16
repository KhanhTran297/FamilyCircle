import { Fragment, useState } from "react";
import UseCookie from "../../hooks/UseCookie";
import useAccount from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../modal/CreatePostModal";
import { ILocalPost } from "../svg/post";
import useTheme from "../../hooks/useTheme";
import { ILocalArrowDropDown } from "../svg/arrow_drop_down";
import { ILocalHome } from "../svg/home";
import { ILocalForum } from "../svg/forum";
import useClickOutSide from "../../hooks/useClickOutSide";

const NewPost = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedKind, setSelectedKind] = useState("");
  const { isLoggedIn } = UseCookie();
  const { accountProfile } = useAccount();
  const navigate = useNavigate();
  const { theme } = useTheme({});
  const postColor = theme === "dark" ? "#FFD8E8" : "#3D0027";
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const { show, setShow, nodeRef } = useClickOutSide();
  const checkAccount = () => {
    if (isLoggedIn()) {
      // if (!userAccount) {
      //   getProfileAccount();
      // }
      // if (!userExpert) {
      //   getProfileExpertAccount();
      // }
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
    <div>
      <CreatePostModal
        fullname={accountProfile?.data?.fullName}
        kind={accountProfile?.data?.kind}
        open={showCreatePost}
        handleClose={() => setShowCreatePost(false)}
        isUpdate={false}
        // selectedKind={selectedKind} // Fixed: removed colon
        avatar={accountProfile?.data?.avatar}
      />
      <div
        className={` fixed Helllo bottom-[56px] desktop:w-[136px] right-0 m-4  desktop:m-0 desktop:top-0 z-auto desktop:left-0 desktop:relative } h-14 w-14 rounded-[28px]  desktop:pl-4 desktop:pt-[10px] desktop:pb-[10px] bg-[#FFD8E8] dark:bg-[#772956]  `}
        ref={nodeRef}
        onClick={checkAccount}
      >
        <div
          className=" desktop:width-[96px] desktop:h-9 flex items-center desktop:gap-3 justify-center desktop:justify-normal cursor-pointer"
          onClick={checkAccount}
        >
          <div className="flex flex-col items-center justify-center w-6 h-6 desktop:justify-normal ">
            <ILocalPost fill={postColor} />
          </div>

          <div>
            <p
              className={`hidden desktop:block font-medium text-${textColor} text-sm font-roboto z-10`}
            >
              New Post
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
