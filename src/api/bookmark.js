import UseCallApi from "../hooks/UseCallApi";

const { useGet, usePost, useDelete } = UseCallApi();

export const getListBookmarkApi = (accountId) => {
  console.log(accountId);
  const url = `/v1/post/bookmark-list?accountId=${accountId}`;
  return useGet({ url, requiredToken: true });
};

export const createBookmarkApi = (params) => {
  const url = "/v1/post/add-bookmark";
  return usePost({ url, requiredToken: true, params });
};

export const deleteBookmarkApi = (id) => {
  const url = `/v1/post/remove-bookmark/${id}`;
  return useDelete({ url, requiredToken: true });
};
