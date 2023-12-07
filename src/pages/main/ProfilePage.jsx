import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostByIdApi } from "../../api/post";
import { ILocalProfileButton } from "../../components/svg/profile_button";
import UserProfile from "../../components/userprofile/UserProfile";
import { getProfileAccountByIdApi } from "../../api/account";
import {
  getListfollowerByIdApi,
  getListfollowingByIdApi,
} from "../../api/follow";

const ProfilePage = () => {
  const { profileId } = useParams();
  const { data: listFollowing } = useQuery({
    queryKey: ["listFollowingById", profileId],
    queryFn: getListfollowingByIdApi,
  });
  const { data: listFollower } = useQuery({
    queryKey: ["listFollowerById", profileId],
    queryFn: getListfollowerByIdApi,
  });
  // const accountProfile = useGetFetchQuery(["accountProfile"]);
  const { data: accountProfile } = useQuery({
    queryKey: ["accountProfile", profileId],
    queryFn: getProfileAccountByIdApi,
  });
  const { data: listOwnPost } = useQuery({
    queryKey: ["listOwnPost", profileId],
    queryFn: () => getPostByIdApi(profileId),
  });
  // useEffect(() => {
  //   setSearchParams({ post: profileId });
  // }, []);
  return (
    <div className="w-full xl:w-[760px] self-stretch">
      <div className="flex flex-row items-center gap-2 pt-2 pb-2 header xl:w-full">
        <div className="left flex h-10 w-10 p-[10px] flex-col justify-center items-center">
          <ILocalProfileButton />
        </div>
        <div className="flex flex-col items-start justify-center right">
          <p className="text-base font-medium font-roboto text-light_surface_on_surface">
            {accountProfile?.data?.fullName}
          </p>
          <p className="text-sm font-normal font-roboto text-light_surface_on_surface">
            {listOwnPost?.data?.totalElements <= 1
              ? `${listOwnPost?.data?.totalElements} post`
              : `${listOwnPost?.data?.totalElements} posts`}
          </p>
        </div>
      </div>
      <UserProfile data={accountProfile?.data} />
    </div>
  );
};

export default ProfilePage;
