import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      This is home page <Link to="login">Sign in</Link>
    </div>
  );
};

export default HomePage;
