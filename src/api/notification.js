import UseCallApi from "../hooks/UseCallApi";
const { UseGet, UsePost } = UseCallApi();

export const createNotificationApi = (params) => {
  const url = "/v1/notification/create";
  return UsePost({ url, params, requiredToken: true });
};

export const createAnnounceApi = (params) => {
  const url = "/v1/notification/announce";
  return UsePost({ url, params, requiredToken: true });
};

export const getListNotificationApi = () => {
  const url = `/v1/notification/list`;
  return UseGet({ url, requiredToken: true });
};
