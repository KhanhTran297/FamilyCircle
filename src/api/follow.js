import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseDelete } = UseCallApi();

export const getListFollowingApi = () => {
  const url = "/v1/relationship/list-following";
  return UseGet({ url, requiredToken: true });
};

export const getFollowApi = (params) => {
  const url = "/v1/relationship/create";
  return UsePost({ url, requiredToken: true, params });
};

export const getUnfollowApi = (accountId) => {
  const url = `/v1/relationship/unfollow/${accountId}`;
  return UseDelete({ url, requiredToken: true });
};
