import UseCallApi from "../hooks/UseCallApi";
const { UseGet, UsePost, UseEdit, UseDelete } = UseCallApi();
export const getListExpertAccountsApi = (params) => {
  const url = "/v1/expert-account/list";
  return UseGet({ url, requiredToken: true, params });
};
export const createExpertAccountApi = (params) => {
  const url = "/v1/expert-account/register";
  return UsePost({ url, params, requiredToken: true });
};
