import { useNavigate } from "react-router-dom";
import UseCookie from "../../hooks/UseCookie";

const HomePage = () => {
  const { removeToken } = UseCookie();
  const navigate = useNavigate();
  return (
    <div>
      This is home page{" "}
      <span
        className=" cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Sign in
      </span>
      <span
        className=" cursor-pointer"
        onClick={() => {
          removeToken();
        }}
      >
        Log out
      </span>
    </div>
  );
};

export default HomePage;
