import UseCallApi from "../hooks/UseCallApi";
const { UseGet, UsePost, UseEdit, UseDelete } = UseCallApi();
export const createHospitalApi = (params) => {
  const url = "/v1/category/create";
  return UsePost({ url, requiredToken: true, params });
};
export const getListCategoryApi = (params) => {
  const url = "/v1/category/list";
  return UseGet({ url, requiredToken: true, params });
};
export const deleteCategoryApi = (id) => {
  const url = `/v1/category/delete/${id}`;
  return UseDelete({ url, requiredToken: true });
};
export const updateCategoryApi = (params) => {
  const url = "/v1/category/update";
  return UseEdit({ url, requiredToken: true, params });
};
export const getCategoryByIdApi = (key, id) => {
  console.log(id);
  const url = `/v1/category/get/${id}`;
  return UseGet({ url, requiredToken: true });
};
