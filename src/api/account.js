import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit } = UseCallApi();
export const authLoginApi = (params) => {
  const url = "/api/token";
  return UsePost({ url, params, type: "basicAuth" });
};
export const getAccountProfileApi = () => {
  const url = "/v1/user-account/profile";
  return UseGet({ url, requiredToken: true });
};
export const getAccountListApi = (params) => {
  const url = "/v1/user-account/list";
  return UseGet({
    url,
    requiredToken: true,
    params,
  });
};
export const getExpertAccountProfileApi = () => {
  const url = "/v1/expert-account/profile";
  return UseGet({ url, requiredToken: true });
};
export const SignUpApi = (params) => {
  const url = "v1/user-account/register";
  return UsePost({ url, params });
};
//logout
export const authLogoutApi = () => {
  const url = "/account/logout";
  return UseGet({ url, requiredToken: true });
};
//edit
export const editProfileApi = (params) => {
  const url = "/v1/user/update";
  return UseEdit({ url, requiredToken: true, params });
};
//changePassword
export const changePasswordApi = (params) => {
  const url = "/v1/account/change-password";
  return UseEdit({ url, requiredToken: true, params });
};
//sendOtp
export const sentOtpApi = (params) => {
  const url = "/v1/user/send-otp-code";
  return UseEdit({ url, params });
};
//checkOtp
export const checkOtpApi = (params) => {
  const url = "/v1/user/check-otp-code";
  return UseEdit({ url, params });
};
//createNewPass
export const createNewPasswordApi = (params) => {
  const url = "/v1/user/change-password";
  return UseEdit({ url, params });
};
