import { useParams } from "react-router-dom";
import { ILocalArrowLeft } from "../../components/svg/arrow_left";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getListPostNewApi, getPostApi } from "../../api/post";
import { Skeleton } from "antd";
import PostDetail from "../../components/post/Postdetail";
import ReadMoreReadLess from "../../components/shared/ReadMoreReadLess";
import { ILocalDot } from "../../components/svg/Dot";
import { useState } from "react";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postRelated, setPostRelated] = useState();
  const { data: postDetail, isLoading } = useQuery({
    queryKey: ["postDetail", id],
    queryFn: () => getPostApi(id),
    enabled: true,
    retry: 0,
    onSuccess: () => {
      refetch();
      // message.success("get post success");
    },
  });
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const { data: postRelate, refetch } = useQuery({
    queryKey: ["postRelate", postDetail?.data?.community?.id],
    queryFn: () =>
      getListPostNewApi({ communityId: postDetail?.data?.community?.id }).then(
        (res) => {
          // const index = randomIntFromInterval(0, res?.data?.content.length - 1);
          // return res?.data?.content[index];
          const tempdata = res?.data?.content.filter(
            (item) => item.id !== postDetail?.data?.id
          );
          const index = randomIntFromInterval(0, tempdata.length - 1);
          setPostRelated(tempdata[index]);
          return tempdata[index];
        }
      ),
  });
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

  const { imageUrl, updatedContent } = extractImageUrlAndContent(
    postRelate?.content
  );
  return (
    <div className="w-full xl:w-[760px]   ">
      <div className="flex flex-col w-full">
        <div className="flex flex-col backdrop-blur-[32px] sticky top-14 xl:top-0 z-20">
          <div
            onClick={() => history.back()}
            className="flex items-start self-stretch px-6 py-2 cursor-pointer "
          >
            <ILocalArrowLeft fill="#1F1A1C" />
            <p className="ml-2 font-medium text-title font-roboto">Post</p>
          </div>
        </div>
        <div className="flex flex-col gap-6 overflow-y-auto xl:mt-6 mt-[72px] max-h-100vh xl:mb-6 w-full ">
          {isLoading ? (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          ) : (
            <PostDetail
              key={postDetail?.data?.id}
              id={postDetail?.data?.id}
              content={postDetail?.data?.content}
              fullname={postDetail?.data?.owner?.fullName}
              kind={postDetail?.data?.owner?.kind}
              modifiedDate={postDetail?.data?.modifiedDate}
              createdDate={postDetail?.data?.createdDate}
              idowner={postDetail?.data?.owner?.id}
              avatar={postDetail?.data?.owner?.avatar}
              kindPost={postDetail?.data?.kind}
              title={postDetail?.data?.title}
              community={postDetail?.data?.community || undefined}
              countComment={postDetail?.data?.commentList?.length || 0}
              topics={postDetail?.data?.topics || undefined}
            />
          )}
        </div>
        <div className="flex flex-col gap-4 px-2 pb-6">
          <div className="flex border-b-[2px] border-solid border-[#a73574] pb-3">
            <p className="text-base font-normal font-roboto text-title">
              Bài Viết liên quan
            </p>
          </div>
          {postRelated !== undefined && (
            <div
              className="grid grid-flow-col grid-cols-[40%_60%] gap-3 cursor-pointer "
              onClick={() => navigate(`/post/${postRelated?.id}`)}
            >
              <div className="flex w-full h-full rounded-sm ">
                <img
                  src={imageUrl || postRelated?.owner?.avatar}
                  alt=""
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-2">
                  <div className=" text-base font-roboto text-[#1F1A1C] font-normal ">
                    {postRelated?.owner?.fullName}
                  </div>
                  <ILocalDot fill="#b7b0b1" />
                  <div className={`flex items-center  `}>
                    <p
                      className={` font-roboto font-normal text-sm text-black`}
                    >
                      {postRelated?.owner?.kind === 3 ? "expert" : "user"}
                    </p>
                  </div>
                  <ILocalDot fill="#b7b0b1" />
                  <div className=" flex items-center bg-[#a73574] px-2 py-1 rounded-lg shadow-sm">
                    <p className="text-sm font-normal text-white font-roboto">
                      {postRelated.community !== undefined
                        ? postRelated?.community?.categoryName
                        : ""}
                    </p>
                  </div>
                </div>
                <ReadMoreReadLess limit={250}>
                  {updatedContent}
                </ReadMoreReadLess>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
