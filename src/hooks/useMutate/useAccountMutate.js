import {
  SignUpApi,
  authLoginApi,
  authLoginGoogleApi,
  getProfileAccountApi,
} from "../../api/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import UseCookie from "../UseCookie";

function useAccountMutate() {
  const { saveToken, removeToken } = UseCookie();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
        // getProfileAccount().then(() => {
        //   navigate("/index");
        // });
        queryClient
          .fetchQuery(["accountProfile"], getProfileAccountApi)
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
        .fetchQuery(["accountProfile"], getProfileAccountApi)
        .then(() => {
          navigate("/index");
        });
    },
    onError: () => {
      message.error("Wrong password or email");
    },
  });
  const { mutateAsync: authSignup } = useMutation({
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
  return {
    authSignup,
    handleLoginGoogle,
    handleLogin,
    accountdata,
  };
}
export default useAccountMutate;
