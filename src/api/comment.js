import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit, UseDelete } = UseCallApi();

export const getListCommentApi = (postId, commentId, size, pageParam = 0) => {
  const url = `v1/comment/list?postId=${postId}&parentId=${commentId}&page=${pageParam}&size=${size}`;
  return UseGet({ url, requiredToken: true });
};
export const getListChildCommentApi = (postId, commentId) => {
  const url = `v1/comment/list?postId=${postId}&parentId=${commentId}`;
  return UseGet({ url, requiredToken: true });
};
export const createCommentApi = (params) => {
  const url = `v1/comment/create`;
  return UsePost({ url, params, requiredToken: true });
};
export const deleteCommentApi = (commentId) => {
  const url = `v1/comment/delete/${commentId}`;
  return UseDelete({ url, requiredToken: true });
};
