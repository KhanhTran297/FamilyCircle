import { useParams } from "react-router-dom";
import { ILocalArrowLeft } from "../../components/svg/arrow_left";
import { useQuery } from "@tanstack/react-query";
import { getPostApi } from "../../api/post";
import { Skeleton } from "antd";
import PostDetail from "../../components/post/Postdetail";

const PostDetailPage = () => {
  // const param = useParams();
  // const {
  //   data: post,
  //   refetch: getPost,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["post", param.id],
  //   queryFn: () => getPostApi(param.id),
  //   enabled: false,
  //   retry: 0,
  //   onSuccess: () => {
  //     // message.success("get post success");
  //   },
  // });

  // useEffect(() => {
  //   getPost();
  // }, []);
  const { id } = useParams();
  const { data: postDetail, isLoading } = useQuery({
    queryKey: ["postDetail", id],
    queryFn: () => getPostApi(id),
    enabled: true,
    retry: 0,
    onSuccess: () => {
      // message.success("get post success");
    },
  });
  // const { post, isLoading } = UsePost();
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
