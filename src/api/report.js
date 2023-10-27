import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit } = UseCallApi();
export const createReportApi = (params) => {
  const url = `/v1/report/create`;
  return UsePost({ url, requiredToken: true, params });
};
