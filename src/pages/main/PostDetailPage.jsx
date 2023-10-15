import { useParams } from "react-router-dom";
import { ILocalArrowLeft } from "../../components/svg/arrow_left";
import { useQuery } from "@tanstack/react-query";
import { getPostApi } from "../../api/post";
import { Skeleton, message } from "antd";
import { useEffect } from "react";
import PostDetail from "../../components/post/Postdetail";

const PostDetailPage = () => {
  const param = useParams();
  const {
    data: post,
    refetch: getPost,
    isLoading,
  } = useQuery({
    queryKey: ["post", param.id],
    queryFn: () => getPostApi(param.id),
    enabled: false,
    retry: 0,
    onSuccess: () => {
      message.success("get post success");
    },
  });

  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="w-full xl:w-[760px]   ">
      <div className="flex flex-col w-full">
        <div className="flex flex-col backdrop-blur-[32px] sticky top-14 xl:top-0">
          <div className="flex items-start self-stretch px-6 py-2 ">
            <ILocalArrowLeft fill="#1F1A1C" />
            <p className="font-medium text-title font-roboto ml-2">Post</p>
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
              key={post?.data?.id}
              id={post?.data?.id}
              content={post?.data?.content}
              fullname={post?.data?.owner?.fullName}
              kind={post?.data?.owner?.kind}
              modifiedDate={post?.data?.modifiedDate}
              createdDate={post?.data?.createdDate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
