import ReadMoreReadLess from "../shared/ReadMoreReadLess";
import PropTypes from "prop-types";

const PostItem = (props) => {
  // const extractImageUrl = (htmlContent) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlContent, "text/html");
  //   const imageElement = doc.querySelector("img");

  //   if (imageElement) {
  //     return imageElement.getAttribute("src");
  //   }

  //   return null;
  // };
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
  const { imageUrl, updatedContent } = extractImageUrlAndContent(
    props?.item?.content
  );

  return (
    <div className="flex flex-row items-start self-stretch w-full gap-6 border border-gray-300 rounded-[25px] hover:opacity-50 cursor-pointer pt-2 pb-2 pl-2 ">
      <div className="w-[144px] h-[144px]  rounded-2xl overflow-hidden ">
        <div
          style={{
            width: "144px",
            height: "144px",
            borderRadius: "16px",
            background: `url(${
              imageUrl || props?.item?.owner?.avatar
            })  top / cover no-repeat`,
          }}
        ></div>
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-row gap-2">
          <div className="text-title font-roboto text-[#1F1A1C] font-medium ">
            {props?.item?.owner?.fullName}
          </div>
          <div
            className={`flex items-center px-2 py-1 rounded-lg shadow-sm ${
              props.item.owner.kind == 3 ? " bg-green-600" : " bg-blue-600"
            }`}
          >
            <p className={` font-roboto font-normal text-sm text-white`}>
              {props.item.owner.kind === 3 ? "expert" : "user"}
            </p>
          </div>
          <div className=" flex items-center bg-[#a73574] px-2 py-1 rounded-lg shadow-sm">
            <p className="text-sm font-normal text-white font-roboto">
              {props?.item?.community !== undefined
                ? props?.item?.community?.categoryName
                : ""}
            </p>
          </div>
        </div>

        <ReadMoreReadLess limit={250}>{updatedContent}</ReadMoreReadLess>
        {/* <div className="flex flex-col gap-[10px] self-stretch items-end">
          <button
            className="flex flex-row items-center self-end gap-2 px-3 rounded-[36px]"
            onClick={() => handleActionBookmark(props.idpost)}
          >
            <div className="w-[18px] h-[18px]">
              <ILocalDelete className=" shrink-0" fill="#A73574  " />
            </div>
            <div className="text-[#A73574] text-sm font-roboto font-medium">
              Remove from bookmark
            </div>
          </button>
        </div> */}
      </div>
    </div>
  );
};
PostItem.propTypes = {
  item: PropTypes.object,
};
export default PostItem;
