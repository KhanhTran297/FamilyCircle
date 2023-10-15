// import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types";
import AvtUser from "../shared/AvtUser";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import CommentBox from "../comment/CommentBox";
import { Skeleton } from "antd";
import useComment from "../../hooks/useComment";
import { useDispatch, useSelector } from "react-redux";
import { setPostId } from "../../redux/slice/post";
// import { ILocalDot } from "../svg/Dot";
// import { ILocalMore } from "../svg/more";
const PostDetail = (props) => {
  // const { theme } = useTheme({});
  // const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const { listComment, isSuccessComment, isloadingComment } = useComment(
    props.id,
    "",
    true
  );

  // console.log("Child", listComment[1].data());
  return (
    <div className="flex flex-col items-start xl:gap-6 gap-6 p-6 pt-3  rounded-[24px] w-full  bg-[#FFF8F8] cursor-pointer">
      <div className="flex flex-row items-start self-stretch gap-2">
        <div className="w-10 h-10">
          <AvtUser imageUrl="https://icdn.dantri.com.vn/thumb_w/640/2019/01/20/2-1547917870331.jpg" />
        </div>
        <HeaderPost {...props} />
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col h-max w-full  overflow-hidden relative ">
          <div className="flex flex-col items-start w-full gap-6 shrink-0">
            <div
              className="w-full h-max text-sm font-normal read-more-read-less font-roboto"
              dangerouslySetInnerHTML={{ __html: props.content }}
            ></div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-b-[1px] border-[#F1DEE4] h-[1px] w-full"></div>
      <FooterPost />
      <div className="border-t-[1px] border-b-[1px] border-[#F1DEE4] h-[1px] w-full"></div>
      {isSuccessComment ? (
        <CommentBox
          commentList={listComment?.data?.content}
          isLoading={isloadingComment}
          postId={props.id}
        />
      ) : (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      )}
    </div>
  );
};
PostDetail.propTypes = {
  key: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
export default PostDetail;
