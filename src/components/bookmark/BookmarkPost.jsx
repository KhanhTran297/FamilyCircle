import { ILocalDelete } from "../svg/delete";
import ReadMoreReadLess from "../shared/ReadMoreReadLess";
import useBookmarkMutate from "../../hooks/useMutate/useBookmarkMutate";
import { useNavigate } from "react-router-dom";

const BookmarkPost = (props) => {
  const { getBookmark } = useBookmarkMutate();
  const navigate = useNavigate();
  const extractImageUrlAndContent = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const imageElement = doc.querySelector("img");

    let imageUrl = null;
    if (imageElement) {
      imageUrl = imageElement.getAttribute("src");
      imageElement.parentNode.removeChild(imageElement);
    }

    const updatedContent = doc.body.innerHTML;
    return { imageUrl, updatedContent };
  };
  // const imageUrl = extractImageUrl(props?.item?.content);

  const { imageUrl, updatedContent } = extractImageUrlAndContent(props.content);
  const handleActionBookmark = (id) => {
    const data = { postId: id };
    getBookmark(data);
  };
  return (
    <div className="flex flex-row items-start self-stretch w-full gap-6 overflow-hidden break-all cursor-pointer ">
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
        <div className="" onClick={() => navigate(`/post/${props.idpost}`)}>
          <ReadMoreReadLess limit={250}>{updatedContent}</ReadMoreReadLess>
        </div>

        <div className="flex flex-col gap-[10px] self-stretch items-end z-50">
          <button
            className="flex flex-row items-center self-end gap-2 px-3 rounded-[36px]"
            onClick={() => handleActionBookmark(props.idpost)}
          >
            <div className="w-[18px] h-[18px]">
              <ILocalDelete className=" shrink-0" fill="#A73574  " />
            </div>
            <div className="flex items-center justify-center ">
              <p className="text-[#A73574] text-sm font-roboto font-medium">
                Remove from bookmark
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPost;
