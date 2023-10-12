import MainLayout from "../layouts/MainLayout";
import BookmarkPage from "../pages/main/BookmarkPage";
import ForumPage from "../pages/main/ForumPage";
import HomePage from "../pages/main/HomePage";
import MessagePage from "../pages/main/MessagePage";
import NotificationPage from "../pages/main/NotificationPage";
import PostDetailPage from "../pages/main/PostDetailPage";
import ProfilePage from "../pages/main/ProfilePage";

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
        element: <HomePage />,
      },
      {
        path: "/post/:id",
        element: <PostDetailPage />,
      },
      {
        path: "/forum",
        element: <ForumPage />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "/bookmark",
        element: <BookmarkPage />,
      },
      {
        path: "/notification",
        element: <NotificationPage />,
      },
      {
        path: "/message",
        element: <MessagePage />,
      },
    ],
  };
  // push route
  routes.push(route);
}
