import UseCallApi from "../hooks/UseCallApi";
const { UseGet, UsePost } = UseCallApi();
export const ListUserCommunityApi = (params) => {
  const url = `/v1/community-member/list`;
  return UseGet({ url, requiredToken: true, params });
};
export const unFolowCommunityApi = (params) => {
  const url = `/v1/community-member/leave`;
  return UsePost({ url, requiredToken: true, params });
};
export const followCommunityApi = (params) => {
  const url = `/v1/community-member/join`;
  return UsePost({ url, requiredToken: true, params });
};
