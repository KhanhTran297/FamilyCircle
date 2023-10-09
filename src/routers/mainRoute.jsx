import MainLayout from "../layouts/MainLayout";
import CmsPage from "../pages/admin/CmsPage";
import HomePage from "../pages/main/HomePage";
import GuardRoute from "./GuardRoute";

// Xem cấu trúc routes ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <MainLayout />,
    // Element là AuthenLayout, các children muốn hiển thị được trong AuthenLayout thì trong Layout phải có outlet mới hiển thị được
    // outlet đóng vai trò tương tự children
    // Xem thêm ở https://reactrouter.com/en/main/components/outlet
    children: [
      {
        path: "/index",
        element: (
          <GuardRoute>
            <HomePage />
          </GuardRoute>
        ),
      },
      {
        path: "/admin/:id",
        element: <CmsPage />,
      },
    ],
  };
  // push route
  routes.push(route);
}
