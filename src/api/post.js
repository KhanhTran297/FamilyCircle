import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit, UseDelete } = UseCallApi();

export const getListPostExpertApi = ({ pageParam = 0 }) => {
  const url = `/v1/post/list?size=5&kind=1&page=${pageParam}`;
  return UseGet({ url, requiredToken: true });
};
export const getListPostAccountApi = ({ pageParam = 0 }) => {
  const url = `/v1/post/list?size=5&kind=2&page=${pageParam}`;
  return UseGet({ url, requiredToken: true });
};
export const getListPostApi = () => {
  const url = `/v1/post/list`;
  return UseGet({ url, requiredToken: true });
};

export const getPostApi = (postId) => {
  const url = `/v1/post/detail/${postId}`;
  return UseGet({ url, requiredToken: true });
};

export const createPostApi = (params) => {
  const url = "/v1/post/create";
  return UsePost({ url, requiredToken: true, params });
};

export const deletePostApi = (id) => {
  const url = `/v1/post/delete/${id}`;
  return UseDelete({ url, requiredToken: true });
};

export const updatePostApi = (params) => {
  const url = "/v1/post/update";
  return UseEdit({ url, requiredToken: true, params });
};
