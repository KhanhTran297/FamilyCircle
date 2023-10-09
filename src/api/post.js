import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit, UseDelete } = UseCallApi();

export const getListPostApi = () => {
  const url = `/v1/post/list`;
  return UseGet({ url });
};

export const getPostApi = (postId) => {
  const url = `/v1/post/detail/${postId}`;
  return UseGet({ url });
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
