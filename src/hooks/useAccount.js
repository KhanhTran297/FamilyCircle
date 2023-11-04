import {
  authLoginApi,
  authLogoutApi,
  changePasswordApi,
  editProfileApi,
  sentOtpApi,
  SignUpApi,
  checkOtpApi,
  getAccountListApi,
  getExpertAccountProfileApi,
  getUserProfileByIdApi,
  getProfileAccountApi,
  getUserAccountProfileApi,
} from "../api/account";
import { setUser } from "../redux/slice/account";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCookie from "./UseCookie";
import { message } from "antd";
import { setExpert } from "../redux/slice/expert";

function useAccount(id) {
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
        navigate("/admin/users");
      } else {
        getProfileAccount().then(() => {
          navigate("/index");
        });
      }
    },
    onError: () => {
      message.error("Wrong password or email");
    },
  });
  //get
  const {
    data: profileAccount,
    refetch: getUserProfileAccount,
    isLoading: loadingPage,
    isSuccess: isSuccessProfileAccount,
  } = useQuery({
    queryKey: ["profileUserAccount"],
    queryFn: getUserAccountProfileApi,
    enabled: false,
    retry: 0,
    onSuccess: (profileAccount) => {
      dispatch(setExpert(null));
      dispatch(setUser(profileAccount.data));
    },
    onError: () => {
      removeToken();
      navigate("/");
    },
  });
  const { data: accountProfile, refetch: getProfileAccount } = useQuery({
    queryKey: ["accountProfile"],
    queryFn: getProfileAccountApi,
    enabled: true,
    retry: 0,
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
      dispatch(setExpert(profileAccount.data));
      dispatch(setUser(null));
    },
    onError: () => {
      removeToken();
      navigate("/");
    },
  });
  //getprofileuserbyid
  const { refetch: getuserProfilebyId, data: userProfile } = useQuery({
    queryKey: ["profileUserById", id],
    queryFn: () => getUserProfileByIdApi(id),
    enabled: id ? true : false,
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
  const { mutateAsync: editProfile } = useMutation({
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
    getUserProfileAccount,
    accountProfile,
    getuserProfilebyId,
    userProfile,
    handleLogin,
    accountdata,
    authSignup,
    profileAccount,
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
    isSuccessProfileAccount,
  };
}
export default useAccount;
