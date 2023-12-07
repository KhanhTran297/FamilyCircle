import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit, UseDelete } = UseCallApi();

export const getListPostExpertApi = ({ pageParam = 0 }) => {
  const url = `/v1/post/list?status=1&size=5&kind=1&page=${pageParam}`;
  return UseGet({ url, requiredToken: true });
};
export const getListPostUsersAccountApi = ({ pageParam = 0 }) => {
  const url = `/v1/post/list?status=1&size=5&kind=2&page=${pageParam}`;
  return UseGet({ url, requiredToken: true });
};

export const getListPostExpertFollowingApi = ({ pageParam = 0 }) => {
  const url = `/v1/post/list?status=1&size=5&kind=1&following=true&page=${pageParam}`;
  return UseGet({ url, requiredToken: true });
};
export const getListPostAccountFollowingApi = ({ pageParam = 0 }) => {
  const url = `/v1/post/list?status=1&size=5&kind=2&following=true&page=${pageParam}`;
  return UseGet({ url, requiredToken: true });
};
export const getListPostApi = (status, size, page) => {
  const url = `/v1/post/list?status=${status}&size=${size}&page=${page}`;
  return UseGet({ url, requiredToken: true });
};
export const getListPostClientApi = () => {
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
export const approvePostApi = (params) => {
  const url = "/v1/post/approve";
  return UseEdit({ url, requiredToken: true, params });
};
export const rejectPostApi = (params) => {
  const url = "/v1/post/reject";
  return UseEdit({ url, requiredToken: true, params });
};
export const getPostByIdApi = (id) => {
  const url = `/v1/post/list?accountId=${id}&status=${1}`;
  return UseGet({ url, requiredToken: true });
};
export const getInfinitiePostByIdApi = (props) => {
  // {
  //   props.pageParam === undefined && props.pageParam === 0;
  // }
  const url = `/v1/post/list?accountId=${props.queryKey[1]}&size=5&page=${
    props.pageParam
  }&status=${1}`;
  return UseGet({ url, requiredToken: true });
};
