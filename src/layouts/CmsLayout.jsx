import { Outlet } from "react-router";

const CmsLayout = () => {
  return (
    <div className=" absolute h-full w-full">
      <Outlet />
    </div>
  );
};

export default CmsLayout;
