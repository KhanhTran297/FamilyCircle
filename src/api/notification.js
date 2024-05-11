import UseCallApi from "../hooks/UseCallApi";
const { UseGet, UsePost, UseEdit, UseDelete, UsePostPushNotification } =
  UseCallApi();

export const createNotificationApi = (params) => {
  const url = "/v1/notification/create";
  return UsePost({ url, params, requiredToken: true });
};

export const createAnnounceApi = (params) => {
  const url = "/v1/notification/announce";
  return UsePost({ url, params, requiredToken: true });
};

export const getListNotificationApi = (params) => {
  const url = `/v2/notification/list`;
  return UseGet({ url, requiredToken: true, params });
};
export const getListMyNotificationApi = (params) => {
  const url = `/v2/notification/my-notification`;
  return UseGet({ url, requiredToken: true, params });
};
export const readAllNotificationApi = () => {
  const url = `/v2/notification/read-all`;
  return UseEdit({ url, requiredToken: true });
};
export const readNotificationApi = (params) => {
  const url = `/v2/notification/change-state`;
  return UseEdit({ url, params, requiredToken: true });
};
export const deleteNotificationApi = (params) => {
  const url = `/v2/notification/delete/${params.id}`;
  return UseDelete({ url, params, requiredToken: true });
};
export const deleteAllNotificationApi = () => {
  const url = `/v2/notification/delete-all`;
  return UseDelete({ url, requiredToken: true });
};
export const pushNotificationApi = (params) => {
  const url = `/send`;
  return UsePostPushNotification({ url, params });
};
