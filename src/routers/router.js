import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoute";
import mainRoutes from "./mainRoute";
const initRoutes = () => {
  // Create routes array
  const routes = [];
  // Thêm các route liên quan đến AuthLayout bằng cách truyền một mảng vào,
  // sau đó cuối hàm dùng routes.push để push object authRoute
  authRoutes(routes);
  mainRoutes(routes);
  // Sau thực thi xong 2 hàm trên thì routes sẽ là mảng gồm
  // [{path:'/' element:... }, {path::'/' element: ...}]
  // Lần lượt với thứ tự ở trên là authRoutes trước rồi tới mainRoutes
  return routes;
};
// gán routes sau khi add xong cho appRoutes
const appRoutes = initRoutes();
// Tạo router Dùng hàm createBrowserRouter, bỏ app routes vào
// Xem ở https://reactrouter.com/en/main/routers/create-browser-router
const router = createBrowserRouter(appRoutes);
// Export router để xử dụng trong file App.jsx
export default router;
