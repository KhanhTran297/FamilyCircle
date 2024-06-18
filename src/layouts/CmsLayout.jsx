import { useEffect } from "react";
import { Outlet } from "react-router";

const CmsLayout = () => {
  const userKind = JSON.parse(localStorage.getItem("userKind"));
  useEffect(() => {
    if (userKind) {
      if (userKind === 2 || userKind === 3) {
        history.back();
      }
    }
  }, [userKind]);
  return (
    <div className="absolute w-full h-full ">
      <Outlet />
    </div>
  );
};

export default CmsLayout;
