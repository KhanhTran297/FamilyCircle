import MainLayout from "../layouts/MainLayout";
import BookmarkPage from "../pages/main/BookmarkPage";
import ForumPage from "../pages/main/ForumPage";
import HomePage from "../pages/main/HomePage";
import MessagePage from "../pages/main/MessagePage";
import NotificationPage from "../pages/main/NotificationPage";
import PostDetailPage from "../pages/main/PostDetailPage";
import ProfilePage from "../pages/main/ProfilePage";
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
          <GuardRoute path="/index">
            <HomePage />
          </GuardRoute>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <GuardRoute path="/post/:id">
            <PostDetailPage />
          </GuardRoute>
        ),
      },
      {
        path: "/forum",
        element: (
          <GuardRoute path="/forum">
            <ForumPage />
          </GuardRoute>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <GuardRoute path="/profile/:id">
            <ProfilePage />
          </GuardRoute>
        ),
      },
      {
        path: "/bookmark",
        element: (
          <GuardRoute path="/bookmark">
            <BookmarkPage />
          </GuardRoute>
        ),
      },
      {
        path: "/notification",
        element: (
          <GuardRoute path="/notification">
            <NotificationPage />
          </GuardRoute>
        ),
      },
      {
        path: "/message",
        element: (
          <GuardRoute path="/message">
            <MessagePage />
          </GuardRoute>
        ),
      },
    ],
  };
  // push route
  routes.push(route);
}
