import UseCallApi from "../hooks/UseCallApi";
const { UseGet, UsePost, UseEdit, UseDelete } = UseCallApi();
export const createEventApi = (params) => {
  const url = "/v1/courses/create";
  return UsePost({ url, requiredToken: true, params });
};
export const getEventApi = (params) => {
  const url = "/v1/courses/list";
  return UseGet({ url, requiredToken: true, params });
};
export const approveEventApi = (params) => {
  const url = "/v1/courses/approve";
  return UseEdit({ url, requiredToken: true, params });
};
export const deleteEventApi = (params) => {
  const url = `/v1/courses/delete/${params}`;
  return UseDelete({ url, requiredToken: true, params });
};
export const rejectEventApi = (params) => {
  const url = "/v1/courses/reject";
  return UseEdit({ url, requiredToken: true, params });
};
export const editEventApi = (params) => {
  const url = "/v1/courses/edit";
  return UseEdit({ url, requiredToken: true, params });
};
export const getEventDetailApi = (params) => {
  const url = `/v1/courses/get/${params.id}`;
  return UseGet({ url, requiredToken: true, params });
};
