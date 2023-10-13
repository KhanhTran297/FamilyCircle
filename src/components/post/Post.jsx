// import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import AvtUser from "../shared/AvtUser";
import { ILocalViewMore } from "../svg/viewmore";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import DOMPurify from "dompurify";
import { Avatar, Input } from "antd";
import { ILocalArrowRight } from "../svg/arrow_right";
// import { ILocalDot } from "../svg/Dot";
// import { ILocalMore } from "../svg/more";

const Post = (props) => {
  // const { theme } = useTheme({});
  // const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const navigate = useNavigate();
  let limit = 1000;
  let content;
  const cssPost =
    props.type === "basic"
      ? "flex flex-col max-h-[320px] w-full  overflow-hidden relative "
      : "flex flex-col h-max w-full  overflow-hidden relative ";
  if (props.content.length > limit && props.type === "basic") {
    content = props.content.slice(0, limit) + "...";
  } else {
    content = props.content;
  }
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="flex flex-col items-start xl:gap-6 gap-6 p-6 pt-3  rounded-[24px] w-full  bg-[#FFF8F8] cursor-pointer">
      <div className="flex flex-row items-start self-stretch gap-2">
        <div className="w-10 h-10">
          <AvtUser imageUrl="https://icdn.dantri.com.vn/thumb_w/640/2019/01/20/2-1547917870331.jpg" />
        </div>
        <HeaderPost {...props} />
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className={cssPost}>
          <div className="flex flex-col items-start w-full gap-6 shrink-0">
            {props.type == "basic" ? (
              <div
                className="w-full h-auto text-sm font-normal read-more-read-less font-roboto"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                onClick={() =>
                  props.type === "basic" && navigate(`/post/${props.id}`)
                }
              ></div>
            ) : (
              <div
                className="w-full h-max text-sm font-normal read-more-read-less font-roboto"
                dangerouslySetInnerHTML={{ __html: props.content }}
              ></div>
            )}
          </div>
          {props.content.length > limit && props.type == "basic" ? (
            <div className="w-full h-[72px] absolute bottom-0 bg-post "></div>
          ) : (
            ""
          )}
        </div>
        {props.content.length > limit && props.type === "basic" ? (
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
      {props.type === "detail" && (
        <div className="border-t-[1px] border-b-[1px] border-[#F1DEE4] h-[1px] w-full"></div>
      )}

      <FooterPost />
      {props.type === "detail" && (
        <div className="border-t-[1px] border-b-[1px] border-[#F1DEE4] h-[1px] w-full"></div>
      )}
      <div className=" w-full flex flex-col gap-6">
        <div className="box-comment">
          <div className="comment">
            <div className="left"></div>
            <div className="right">
              <div className="body">
                <div className="title">
                  <div className="name"></div>
                  <div className="kind"></div>
                  <div className="date"></div>
                </div>
                <div className="content"></div>
              </div>
              <div className="footer"></div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row gap-2">
          <Avatar
            src="https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg"
            className=" w-10 h-10 rounded-[40px]"
          />
          <Input
            placeholder="Say some thing about this post..."
            className=" flex flex-row-reverse pl-4 gap-2 h-10 flex-1-0-0 rounded-[100px] "
            prefix={<ILocalArrowRight fill="#1F1A1C" />}
          ></Input>
        </div>
      </div>
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
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default Post;
