import {
  SignUpApi,
  authLoginApi,
  authLoginGoogleApi,
  changePasswordApi,
  checkOtpApi,
  createNewPasswordApi,
  getProfileAccountApi,
  sentOtpApi,
} from "../../api/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import UseCookie from "../UseCookie";

function useAccountMutate() {
  const { saveToken, removeToken } = UseCookie();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutateAsync: handleLogin,
    data: accountdata,
    isPending: loadingLogin,
  } = useMutation({
    mutationFn: authLoginApi,
    onSuccess: (data) => {
      removeToken();
      //Luu thong tin account vao client state
      // dispatch(getAccountProfileApi({ requiredToken: true }));
      saveToken(data?.access_token, data?.refresh_token);
      if (data?.user_kind === 1) {
        navigate("/admin/users");
      } else {
        // getProfileAccount().then(() => {
        //   navigate("/index");
        // });
        console.log("data", data);

        queryClient
          .fetchQuery({
            queryKey: ["accountProfile"],
            queryFn: getProfileAccountApi,
          })
          .then(() => {
            navigate("/index");
          });

        // queryClient.fetchQuery("accountProfile").then(() => {
        //   navigate("/index");
        // });
      }
    },
    onError: () => {
      message.error("Wrong password or email");
    },
  });
  const { mutateAsync: handleLoginGoogle } = useMutation({
    mutationFn: authLoginGoogleApi,
    onSuccess: (data) => {
      removeToken();
      saveToken(data?.access_token, data?.refresh_token);

      queryClient
        .fetchQuery({
          queryKey: ["accountProfile"],
          queryFn: getProfileAccountApi,
        })
        .then(() => {
          navigate("/index");
        });
    },
    onError: () => {
      message.error("Wrong password or email");
    },
  });
  const { mutateAsync: authSignup, isLoading: loadingSignup } = useMutation({
    mutationFn: SignUpApi,
    onSuccess: (data) => {
      {
        data.code == "ERROR-ACCOUNT-000"
          ? message.error("email exist")
          : navigate("/");
      }
      // useSuccess("Sign up success!");
    },
  });
  const { mutateAsync: sendOtp, isLoading: loadingSentOtp } = useMutation({
    mutationFn: sentOtpApi,
    onSuccess: () => {},
  });
  const { mutateAsync: checkOtp, isLoading: loadingCheckOtp } = useMutation({
    mutationFn: checkOtpApi,
    onSuccess: () => {},
  });
  const {
    mutateAsync: createNewPassword,
    isLoading: loadingCreateNewPassword,
    isSuccess: successCreateNewPassword,
  } = useMutation({
    mutationFn: createNewPasswordApi,
    onSuccess: () => {},
  });
  return {
    loadingLogin,
    loadingSignup,
    loadingCheckOtp,
    successCreateNewPassword,
    loadingCreateNewPassword,
    loadingSentOtp,
    createNewPassword,
    checkOtp,
    sendOtp,
    authSignup,
    handleLoginGoogle,
    handleLogin,
    accountdata,
  };
}
export default useAccountMutate;
