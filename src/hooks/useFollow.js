import { useQuery } from "@tanstack/react-query";
import { getListFollowingApi } from "../api/follow";

function useFollow(id) {
  const { data: listFollowing, refetch: getListFollowing } = useQuery({
    queryKey: ["listFollowing"],
    queryFn: getListFollowingApi,
  });

  
  return {
    listFollowing,
    getListFollowing,
  
  };
}
export default useFollow;
