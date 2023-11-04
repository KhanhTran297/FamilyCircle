import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getPostByIdApi } from "../../api/post";
import { ILocalProfileButton } from "../../components/svg/profile_button";
import useAccount from "../../hooks/useAccount";
import useExpert from "../../hooks/useExpert";
import UserProfile from "../../components/userprofile/UserProfile";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import { getProfileAccountByIdApi } from "../../api/account";

const ProfilePage = () => {
  const { profileId } = useParams();

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
    <div className="w-full xl:w-[760px]">
      <div className="header xl:w-full flex flex-row gap-2 pt-2 pb-2 items-center">
        <div className="left flex h-10 w-10 p-[10px] flex-col justify-center items-center">
          <ILocalProfileButton />
        </div>
        <div className="right flex flex-col justify-center items-start">
          <p className=" font-roboto text-base font-medium text-light_surface_on_surface">
            {accountProfile?.data?.fullName}
          </p>
          <p className=" font-roboto text-sm font-normal text-light_surface_on_surface">
            {listOwnPost?.data?.totalElements} posts
          </p>
        </div>
      </div>
      <UserProfile data={accountProfile?.data} />
    </div>
  );
};

export default ProfilePage;
