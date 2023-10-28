import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost } = UseCallApi();

export const getListBookmarkApi = () => {
  const url = "/v1/post/list-bookmark";
  return UseGet({ url, requiredToken: true });
};

export const getBookmarkApi = (params) => {
  const url = "/v1/post/bookmark";
  return UsePost({ url, requiredToken: true, params });
};
export const getListBookmarkLoadApi = ({ pageParam = 0 }) => {
  const url = `/v1/post/list-bookmark?size=5&page=${pageParam}`;
  return UseGet({ url, requiredToken: true });
};
