import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import UseCookie from "../../hooks/UseCookie";
import useAccount from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../modal/CreatePostModal";
import { ILocalPost } from "../svg/post";
import useTheme from "../../hooks/useTheme";

const NewPost = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const selector = useSelector((state) => state.account);
  const { isLoggedIn } = UseCookie();
  const { getProfileAccount } = useAccount();
  const navigate = useNavigate();
  const userAccount = selector.account;
  const { theme } = useTheme({});

  const checkAccount = () => {
    if (isLoggedIn()) {
      if (!userAccount) {
        getProfileAccount();
      } else {
        setShowCreatePost(true);
      }
    } else {
      navigate("/");
    }
  };
  const textColor = theme === "dark" ? "#FFD8E8" : "#3D0027";

  return (
    <Fragment>
      <div className="relative z-0">
        <CreatePostModal
          //   avatar={userAccount.userAvatar}
          fullname={userAccount.userFullName}
          kind={userAccount.userKind}
          open={showCreatePost}
          handleClose={() => setShowCreatePost(false)}
          isEdit={false}
        />
      </div>
      <button
        className=" fixed bottom-[56px] right-0 m-4 xl:m-0 xl:top-0  xl:left-0 xl:relative   xl:w-[136px] h-14 w-14      rounded-[28px]  xl:pl-4 xl:pt-[10px] xl:pb-[10px] bg-[#FFD8E8] dark:bg-[#772956]  "
        onClick={checkAccount}
      >
        <div className="xl:width-[96px] xl:h-9 flex items-center justify-center xl:justify-normal">
          <div className="flex items-center w-6 h-6 xl:mr-3 ">
            <ILocalPost fill={textColor} />
          </div>
          <p className="hidden xl:block font-medium text-[#3D0027]  text-sm dark:text-[#FFD8E8] font-roboto z-10  ">
            New Post
          </p>
        </div>
      </button>
    </Fragment>
  );
};

export default NewPost;
