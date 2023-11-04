import { useEffect } from "react";
import UseCookie from "../hooks/UseCookie";
import useAccount from "../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/shared/LoadingPage";
import { useQueryClient } from "@tanstack/react-query";

const GuardRoute = ({ children }, path) => {
  const { isLoggedIn } = UseCookie();
  const queryClient = useQueryClient();
  // const { getProfileAccount } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      // getProfileAccount();
      queryClient.invalidateQueries(["accountProfile"]);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div>
      {/* {loadingPage ? (
        <LoadingPage
          css={
            "absolute  justify-center items-center place-items-center h-full w-full bg-white dark:bg-black"
          }
        />
      ) : ( */}
      <div>{children}</div>
      {/* )} */}
    </div>
  );
};
export default GuardRoute;
