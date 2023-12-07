import { ILocalDelete } from "../svg/delete";
import ReadMoreReadLess from "../shared/ReadMoreReadLess";
import useBookmarkMutate from "../../hooks/useMutate/useBookmarkMutate";
import { useNavigate } from "react-router-dom";

const BookmarkPost = (props) => {
  const { getBookmark } = useBookmarkMutate();
  const navigate = useNavigate();
  const extractImageUrl = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const imageElement = doc.querySelector("img");

    if (imageElement) {
      return imageElement.getAttribute("src");
    }

    return null;
  };

  const imageUrl = extractImageUrl(props.content);
  const handleActionBookmark = (id) => {
    const data = { postId: id };
    getBookmark(data);
  };
  return (
    <div
      onClick={() => navigate(`/post/${props.idpost}`)}
      className="flex flex-row items-start self-stretch w-full gap-6 cursor-pointer overflow-hidden break-all "
    >
      <div className="w-[144px] h-[144px]  rounded-2xl">
        <div
          style={{
            width: "144px",
            height: "144px",
            borderRadius: "16px",
            background: `url(${imageUrl || props.avt})  top / cover no-repeat`,
          }}
        ></div>
      </div>
      <div className="flex flex-col w-full gap-2 break-words">
        <div className="text-title font-roboto text-[#1F1A1C] font-medium ">
          {props.title ? props.title : props.fullname}
        </div>
        <ReadMoreReadLess limit={200}>{props.content}</ReadMoreReadLess>
        <div className="flex flex-col gap-[10px] self-stretch items-end">
          <button
            className="flex flex-row items-center self-end gap-2 px-3 rounded-[36px]"
            onClick={() => handleActionBookmark(props.idpost)}
          >
            <div className="w-[18px] h-[18px]">
              <ILocalDelete className=" shrink-0 " fill="#A73574  " />
            </div>
            <div className="text-[#A73574] text-sm font-roboto font-medium ">
              Remove from bookmark
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPost;
