// import { useEffect } from "react";
// import UseCookie from "../hooks/UseCookie";
// import useAccount from "../hooks/useAccount";
// import { useNavigate } from "react-router-dom";

// const GuardRoute = ({ children }) => {
//   const { isLoggedIn } = UseCookie();
//   const { profileAccount, getProfileAccount, loadingPage } = useAccount();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (isLoggedIn()) {
//       if (!profileAccount?.data) {
//         getProfileAccount();
//         navigate("/index");
//       } else {
//         navigate("/index");
//         return;
//       }
//     } else {
//       navigate("/");
//     }
//   }, []);
//   return <div>{loadingPage ? <div>Loading</div> : <div>{children}</div>}</div>;
// };

// export default GuardRoute;
import { useEffect } from "react";
// import UseCookie from "../hooks/UseCookie";
import useAccount from "../hooks/useAccount";
import { useNavigate } from "react-router-dom";

const GuardRoute = ({ children }) => {
  // const { isLoggedIn } = UseCookie();
  const { loadingPage } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/index");
  }, []);
  return <div>{loadingPage ? <div>Loading</div> : <div>{children}</div>}</div>;
};

export default GuardRoute;
