import {
  authLoginApi,
  authLogoutApi,
  changePasswordApi,
  editProfileApi,
  getAccountProfileApi,
  sentOtpApi,
  SignUpApi,
  checkOtpApi,
  getAccountListApi,
  getExpertAccountProfileApi,
} from "../api/account";
import { setUser } from "../redux/slice/account";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCookie from "./UseCookie";

import { message } from "antd";

function useAccount() {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { saveToken, removeToken } = useCookie();
  //variables
  //login
  const { mutate: handleLogin, data: accountdata } = useMutation({
    mutationFn: authLoginApi,
    onSuccess: (data) => {
      removeToken();
      //Luu thong tin account vao client state
      // dispatch(getAccountProfileApi({ requiredToken: true }));
      saveToken(data?.access_token, data?.refresh_token);
      if (data?.user_kind === 1) {
        navigate("/admin");
      } else {
        navigate("/index");
      }
    },
    onError: () => {
      message.error("Wrong password or email");
    },
  });
  //get
  const {
    data: profileAccount,
    refetch: getProfileAccount,
    isLoading: loadingPage,
  } = useQuery({
    queryKey: ["profileAccount"],
    queryFn: getAccountProfileApi,
    enabled: false,
    retry: 0,
    onSuccess: (profileAccount) => {
      dispatch(setUser(profileAccount.data));
    },
    onError: () => {
      removeToken();
      navigate("/");
    },
  });
  //getList expert accounts
  const {
    data: profileExpertAccount,
    refetch: getProfileExpertAccount,
    isLoading: loadingExpertPage,
  } = useQuery({
    queryKey: ["profileExpertAccount"],
    queryFn: getExpertAccountProfileApi,
    enabled: false,
    retry: 0,
    onSuccess: (profileAccount) => {
      dispatch(setUser(profileAccount.data));
    },
    onError: () => {
      removeToken();
      navigate("/");
    },
  });
  //getList user accounts
  const { data: listUserAccounts, refetch: getListUserAccounts } = useQuery({
    queryKey: ["listAccount"],
    queryFn: getAccountListApi,
    enabled: false,
    retry: 0,
    onSuccess: () => {
      message.success("Get list user success");
    },
  });
  //signup
  const { mutate: authSignup } = useMutation({
    mutationFn: SignUpApi,
    onSuccess: (data) => {
      console.log("data", data.code);
      {
        data.code == "ERROR-ACCOUNT-0000"
          ? message.error("email exist")
          : navigate("/");
      }
      // useSuccess("Sign up success!");
    },
  });
  //logout
  const { mutate: logout } = useMutation({
    mutationFn: authLogoutApi,
    onSuccess: () => {
      removeToken();
      // useSuccess("Logout success!");
      navigate("/");
    },
  });
  //edit profile
  const { mutate: editProfile } = useMutation({
    mutationFn: editProfileApi,
    onSuccess: (respone) => {
      if (respone.result) {
        getProfileAccount();
        // useSuccess("Edit success!");
      } else {
        // useError("Edit fail");
      }
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  //change password
  const { mutate: changePassword } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      // useSuccess("ChangePassword success");
    },
    onError: () => {
      // useError("ChangePassword Fail");
    },
  });
  //send Otp
  const { mutate: sendOtp, data: datasendOtp } = useMutation({
    mutationFn: sentOtpApi,
    onSuccess: () => {
      {
        // data.code == "ERROR-USER-0004"
        //   ? useError("Email doesn't exist")
        //   : useSuccess("Send otp success");
      }
    },
    onError: () => {
      return false;
    },
  });
  //Check Otp
  const { mutate: checkOtp } = useMutation({
    mutationFn: checkOtpApi,
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    handleLogin,
    accountdata,
    authSignup,
    profileAccount,
    getAccountProfileApi,
    getProfileAccount,
    logout,
    loadingPage,
    editProfile,
    changePassword,
    sendOtp,
    checkOtp,
    datasendOtp,
    listUserAccounts,
    getListUserAccounts,
    profileExpertAccount,
    getProfileExpertAccount,
    loadingExpertPage,
  };
}
export default useAccount;
