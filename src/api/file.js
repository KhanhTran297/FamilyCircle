import UseCallApi from "../hooks/UseCallApi";

const { UsePostFile } = UseCallApi();

export const uploadImageApi = (params) => {
  const url = "/v1/file/upload/s3";
  return UsePostFile({ url, params, requiredToken: true });
};
