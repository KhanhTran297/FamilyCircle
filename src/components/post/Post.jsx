// import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import AvtUser from "../shared/AvtUser";
import { ILocalViewMore } from "../svg/viewmore";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import DOMPurify from "dompurify";

import UsePost from "../../hooks/UsePost";

// import { ILocalDot } from "../svg/Dot";
// import { ILocalMore } from "../svg/more";

const Post = (props) => {
  // const { theme } = useTheme({});
  // const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const navigate = useNavigate();
  let limit = 1000;
  let content;
  if (props.content.length > limit) {
    content = props.content.slice(0, limit) + "...";
  } else {
    content = props.content;
  }

  const { deletePost } = UsePost();

  const handleDeletePost = (id) => {
    deletePost(id);
  };

  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div className="flex flex-col items-start xl:gap-6 gap-6 p-6 pt-3  rounded-[24px] w-full  bg-[#FFF8F8] cursor-pointer">

      <div className="flex flex-row items-start self-stretch gap-2">
        <div className="w-10 h-10">
          <AvtUser imageUrl="https://icdn.dantri.com.vn/thumb_w/640/2019/01/20/2-1547917870331.jpg" />
        </div>
        <HeaderPost {...props} onDelete={() => handleDeletePost(props.id)} />
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col max-h-[320px] w-full  overflow-hidden relative ">
          <div className="flex flex-col items-start w-full gap-6 shrink-0">
            <div

              className="w-full h-auto font-roboto"
              dangerouslySetInnerHTML={{ __html: content }}

              onClick={() => navigate(`/post/${props.id}`)}

            ></div>
          </div>
          {props.content.length > limit ? (
            <div className="w-full h-[72px] absolute bottom-0 bg-post "></div>
          ) : (
            ""
          )}
        </div>
        {props.content.length > limit ? (
          <div className="flex flex-col items-center justify-center self-stretch gap-[10px] cursor-pointer">
            <button className="cursor-pointer flex h-10 gap-[7px] bg-[#A73574] rounded-[36px] px-4 flex-row items-center">
              <ILocalViewMore fill="#FFF8F8" />
              <p className="font-roboto text-[#FFF] text-sm font-medium">
                View more
              </p>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <FooterPost />
    </div>
  );
};
Post.propTypes = {
  key: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
export default Post;
