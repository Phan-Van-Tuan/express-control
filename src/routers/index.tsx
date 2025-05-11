import { createBrowserRouter, Navigate } from "react-router-dom";
import { DEFINE_ROUTERS } from "../contants/routers-papper";
import TheLayout from "../components/layouts/TheLayout";
import ErrorPage from "../components/layouts/ErrorPage";
import Login from "../pages/auth-login";
import Account from "../pages/account";
import Logout from "../pages/Logout";
import FinancialDashboard from "../pages/Financial";
import Inbox from "../pages/Inbox";
import Notification from "../pages/Notification";
import Event from "../pages/Event";
import AuthGuard from "./auth.guard";
import GuestGuard from "./guest.guard";
import OTP from "../pages/OTP";
import CreateNotificationPanel from "../pages/notify/CreateNotification";
import SystemConfiguration from "../pages/notify/Test";
import RiderListPage from "../pages/account-rider";
import DashboardPage from "../pages/dashboard-tab";
import DriverPage from "../pages/account-driver";
import DriverDetailPage from "../pages/account-driver-[id]";
import ConfigPage from "../pages/config";
import { RouteAssignmentPage } from "../pages/router";

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
        element: <Navigate to={DEFINE_ROUTERS.dashboard} replace />,
      },
      {
        path: DEFINE_ROUTERS.dashboard,
        element: <DashboardPage />,
      },
      {
        path: DEFINE_ROUTERS.analysis,
        element: <FinancialDashboard />,
      },
      {
        path: DEFINE_ROUTERS.inbox,
        element: <Inbox />,
      },
      {
        path: DEFINE_ROUTERS.users.index,
        element: <Account />,
      },
      {
        path: DEFINE_ROUTERS.users.rider,
        element: <RiderListPage />,
      },
      {
        path: DEFINE_ROUTERS.users.driver,
        element: <DriverPage />,
      },
      {
        path: DEFINE_ROUTERS.users.driver_id,
        element: <DriverDetailPage />,
      },
      {
        path: DEFINE_ROUTERS.route,
        element: <RouteAssignmentPage />,
      },
      {
        path: DEFINE_ROUTERS.events,
        element: <Event />,
      },
      {
        path: DEFINE_ROUTERS.notifications.index,
        element: <Notification />,
      },
      {
        path: DEFINE_ROUTERS.notifications.create,
        element: <CreateNotificationPanel />,
      },
      {
        path: DEFINE_ROUTERS.config,
        element: <ConfigPage />,
      },
      {
        path: DEFINE_ROUTERS.logout,
        element: <Logout />,
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
  {
    path: DEFINE_ROUTERS.test,
    element: <SystemConfiguration />,
  },
  {
    path: DEFINE_ROUTERS.otp,
    element: <OTP />,
  },
]);

export default router;
