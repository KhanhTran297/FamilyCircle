import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseDelete } = UseCallApi();




export const getFollowApi = (params) => {
  const url = "/v1/relationship/create";
  return UsePost({ url, requiredToken: true, params });
};

export const getUnfollowApi = (accountId) => {
  const url = `/v1/relationship/unfollow/${accountId}`;
  return UseDelete({ url, requiredToken: true });
};

export const createFollowApi = (params) => {
  const url = "/v1/relationship/create";
  return UsePost({ url, requiredToken: true, params });
};
export const deleteFollowApi = (id) => {
  const url = `/v1/relationship/delete/${id}`;
  return UsePost({ url, requiredToken: true });
};
export const getListFollowingApi = () => {
  const url = `/v1/relationship/list-following`;
  return UseGet({ url, requiredToken: true });
};
export const getListFollowerApi = () => {
  const url = `/v1/relationship/list-follower`;
  return UseGet({ url, requiredToken: true });
};
export const unFollowApi = (id) => {
  const url = `/v1/relationship/unfollow/${id}`;
  return UseDelete({ url, requiredToken: true });
};
export const getRelationshipApi = (id) => {
  const url = `/v1/relationship/get/${id}`;
  return UseGet({ url, requiredToken: true });
};

