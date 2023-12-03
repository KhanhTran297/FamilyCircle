import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost } = UseCallApi();

export const getListReactionApi = (params) => {
  const url = `/v1/post/list-reaction?postId=${params.queryKey[1]}`;
  return UseGet({ url, requiredToken: true });
};
export const getReactApi = (params) => {
  const url = "/v1/post/react";
  return UsePost({ url, requiredToken: true, params });
};
