import MainLayout from "../layouts/MainLayout";
import BabyHealthPage from "../pages/main/BabyHealthPage";
import BookmarkPage from "../pages/main/BookmarkPage";
import CommunicationPage from "../pages/main/CommunicationPage";
import CommunityDetailPage from "../pages/main/CommunityDetailPage";
import EventDetailPage from "../pages/main/EventDetailPage";
import HomePage from "../pages/main/HomePage";
import MessagePage from "../pages/main/MessagePage";
import MotherHealthPage from "../pages/main/MotherHealthPage";
import NotificationPage from "../pages/main/NotificationPage";
import PostDetailPage from "../pages/main/PostDetailPage";
import ProfilePage from "../pages/main/ProfilePage";
import SchedulerPage from "../pages/main/SchedulerPage";
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
        path: "/community",
        element: (
          <GuardRoute path="/community">
            <CommunicationPage />
          </GuardRoute>
        ),
      },
      {
        path: "/community/:communityName",
        element: (
          <GuardRoute path="/community/:communityName">
            <CommunityDetailPage />
          </GuardRoute>
        ),
      },
      {
        path: "/profile/:profileId",
        element: (
          <GuardRoute path="/profile/:profileId">
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
      {
        path: "/babyhealth",
        element: (
          <GuardRoute path="/babyhealth">
            <BabyHealthPage />
          </GuardRoute>
        ),
      },
      {
        path: "/motherhealth",
        element: (
          <GuardRoute path="/motherhealth">
            <MotherHealthPage />
          </GuardRoute>
        ),
      },
      {
        path: "/schedule",
        element: (
          <GuardRoute path="/schedule">
            <SchedulerPage />
          </GuardRoute>
        ),
      },
      {
        path: "/schedule/:id",
        element: <EventDetailPage />,
      },
    ],
  };
  // push route
  routes.push(route);
}
