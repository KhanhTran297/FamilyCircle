import { useEffect } from "react";
import UseCookie from "../hooks/UseCookie";
import useAccount from "../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/shared/LoadingPage";
import { Spin } from "antd";

const GuardRoute = ({ children }) => {
  const { isLoggedIn } = UseCookie();
  const { profileAccount, getProfileAccount, loadingPage } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      if (!profileAccount?.data) {
        getProfileAccount();
        navigate("/index");
      } else {
        navigate("/index");
        return;
      }
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div>
      {loadingPage ? (
        <LoadingPage
          css={
            "absolute  justify-center items-center place-items-center h-full w-full bg-white dark:bg-black"
          }
        />
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};
