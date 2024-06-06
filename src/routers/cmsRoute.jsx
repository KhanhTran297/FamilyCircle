import AcademicDegree from "../components/admin/AcademicDegree";
import CommunityContent from "../components/admin/CommunityContent";
import CourseRequestContent from "../components/admin/CourseRequestContent";
import DepartmentContent from "../components/admin/DepartmentContent";
import EventDetailContent from "../components/admin/EventDetailContent";
import EventsContent from "../components/admin/EventsContent";
import ExpertsContent from "../components/admin/ExpertsContent";
import HospitalContent from "../components/admin/HospitalContent";
import HospitalRoleContent from "../components/admin/HospitalRoleContent";
import PostsContent from "../components/admin/PostsContent";
import ReportCommentContent from "../components/admin/ReportCommentContent";
import ReportPostContent from "../components/admin/ReportPostContent";
import TopicContent from "../components/admin/TopicContent";
import UsersContent from "../components/admin/UsersContent";
import CmsLayout from "../layouts/CmsLayout";
import CmsPage from "../pages/admin/CmsPage";

// Xem cấu trúc routes ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <CmsLayout />,
    // Element là AuthenLayout, các children muốn hiển thị được trong AuthenLayout thì trong Layout phải có outlet mới hiển thị được
    // outlet đóng vai trò tương tự children
    // Xem thêm ở https://reactrouter.com/en/main/components/outlet
    children: [
      {
        path: "/admin/",
        element: <CmsPage />,
        children: [
          {
            path: "users",
            element: <UsersContent />,
          },
          {
            path: "experts",
            element: <ExpertsContent />,
          },
          {
            path: "hospital",
            element: <HospitalContent />,
          },
          {
            path: "hospitalrole",
            element: <HospitalRoleContent />,
          },
          {
            path: "academicdegree",
            element: <AcademicDegree />,
          },
          {
            path: "department",
            element: <DepartmentContent />,
          },
          {
            path: "posts",
            element: <PostsContent />,
          },
          {
            path: "community/",

            children: [
              {
                path: ":id",
                element: <TopicContent />,
              },
              {
                path: "",
                element: <CommunityContent />,
              },
            ],
          },
        ],
      },
      {
        path: "/report/",
        element: <CmsPage />,
        children: [
          {
            path: "posts",
            element: <ReportPostContent />,
          },
          {
            path: "comments",
            element: <ReportCommentContent />,
          },
        ],
      },
      {
        path: "/events/",
        element: <CmsPage />,
        children: [
          {
            path: "",
            element: <EventsContent />,
          },
          {
            path: ":id",
            element: <EventDetailContent />,
          },
        ],
      },
      {
        path: "/courserequests",
        element: <CmsPage />,
        children: [
          {
            path: "",
            element: <CourseRequestContent />,
          },
          {
            path: ":id",
            element: <EventDetailContent />,
          },
        ],
      },
    ],
  };
  // push route
  routes.push(route);
}
