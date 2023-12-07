import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost, UseEdit, UsePostGoogle } = UseCallApi();
export const authLoginApi = (params) => {
  const url = "/api/token";
  return UsePost({ url, params, type: "basicAuth" });
};
export const authLoginGoogleApi = (params) => {
  const url = "/api/token";
  return UsePostGoogle({ url, params, type: "basicAuth" });
};
export const getUserAccountProfileApi = () => {
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
export const getProfileAccountByIdApi = (params) => {
  const url = `/v1/account/get-profile/${params.queryKey[1]}`;
  return UseGet({ url, requiredToken: true });
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
export const getProfileAccountApi = () => {
  const url = "/v1/account/profile";
  return UseGet({ url, requiredToken: true });
};
//edit
export const editProfileApi = (params) => {
  const url = "/v1/user-account/update-profile";
  return UseEdit({ url, requiredToken: true, params });
};
//changePassword
export const changePasswordApi = (params) => {
  const url = "/v1/account/change-password";
  return UseEdit({ url, requiredToken: true, params });
};
//sendOtp
export const sentOtpApi = (params) => {
  const url = "/v1/account/send-otp-code";
  return UsePost({ url, params });
};
//checkOtp
export const checkOtpApi = (params) => {
  const url = "/v1/account/check-otp-code";
  return UseEdit({ url, params });
};
//createNewPass
export const createNewPasswordApi = (params) => {
  const url = "/v1/account/change-password-forgot";
  return UseEdit({ url, params });
};
//getuserProfilebyId
export const getUserProfileByIdApi = (id) => {
  const url = `/v1/user-account/get/${id}`;
  return UseGet({ url, requiredToken: true });
};
//listAccountClient
export const getListAccountClientApi = (params) => {
  const url = `/v1/account/list-account-client?isClient=true&fullName=${params.queryKey[1]}`;
  return UseGet({ url, requiredToken: true });
};
export const getAccountClientApi = () => {
  const url = `/v1/account/list-account-client?isClient=true`;
  return UseGet({ url, requiredToken: true });
};
