import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit } = UseCallApi();
export const createReportApi = (params) => {
  const url = `/v1/report/create`;
  return UsePost({ url, requiredToken: true, params });
};
export const getListReportApi = (kind, size, page) => {
  const url = `/v1/report/list?kind=${kind}&page=${page}&size=${size}`;
  return UseGet({ url, requiredToken: true });
};
export const approveReportApi = (params) => {
  const url = `/v1/report/approve`;
  return UseEdit({ url, requiredToken: true, params });
};
export const rejectReportApi = (params) => {
  const url = `/v1/report/reject`;
  return UseEdit({ url, requiredToken: true, params });
};
