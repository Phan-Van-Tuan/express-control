import { createBrowserRouter } from "react-router-dom";
import { DEFINE_ROUTERS } from "../contants/routers-papper";
import TheLayout from "../components/layouts/TheLayout";
import ErrorPage from "../components/layouts/ErrorPage";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Logout from "../pages/Logout";
import Financial from "../pages/Financial";
import Inbox from "../pages/Inbox";
import Notification from "../pages/Notification";
import Event from "../pages/Event";
import AuthGuard from "./auth.guard";
import GuestGuard from "./guest.guard";
import OTP from "../pages/OTP";

const router = createBrowserRouter([
  {
    path: DEFINE_ROUTERS.home,
    errorElement: <ErrorPage />,
    element: (
      <AuthGuard>
        <TheLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        path: DEFINE_ROUTERS.dashboard,
        element: <Dashboard />,
      },
      {
        path: DEFINE_ROUTERS.analysis,
        element: <Financial />,
      },
      {
        path: DEFINE_ROUTERS.inbox,
        element: <Inbox />,
      },
      {
        path: DEFINE_ROUTERS.users,
        element: <Dashboard />,
      },
      {
        path: DEFINE_ROUTERS.events,
        element: <Event />,
      },
      {
        path: DEFINE_ROUTERS.notifications,
        element: <Notification />,
      },
      {
        path: DEFINE_ROUTERS.logout,
        element: <Logout />,
      },
      {
        path: DEFINE_ROUTERS.otp,
        element: <OTP />,
      },
    ],
  },
  {
    path: DEFINE_ROUTERS.login,
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
]);

export default router;
