import { useNavigate } from "react-router-dom";
import UseCookie from "../../hooks/UseCookie";

const HomePage = () => {
  const { removeToken } = UseCookie();
  const handleLogout = () => {
    removeToken();
    navigate("/");
  };
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
      <span className=" cursor-pointer" onClick={handleLogout}>
        Log out
      </span>
    </div>
  );
};

export default HomePage;
