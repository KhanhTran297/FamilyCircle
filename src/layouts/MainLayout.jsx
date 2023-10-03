import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className=" absolute h-full w-full">
      <Outlet />
    </div>
  );
};

export default MainLayout;
