import {
  Calendar,
  Megaphone,
  Settings,
  Gauge,
  MailQuestion,
  SquareUser,
  Wallet,
  Route,
} from "lucide-react";
import { DEFINE_ROUTERS } from "./routers-papper";

export const menu = [
  {
    label: "Dashboard",
    icon: Gauge,
    to: DEFINE_ROUTERS.dashboard,
  },
  {
    label: "Account",
    icon: SquareUser,
    to: DEFINE_ROUTERS.users.index,
    children: [
      { label: "Rider", to: DEFINE_ROUTERS.users.rider },
      { label: "Driver", to: DEFINE_ROUTERS.users.driver },
    ],
  },
  { label: "Route", icon: Route, to: DEFINE_ROUTERS.route },
  { label: "Balance", icon: Wallet, to: DEFINE_ROUTERS.analysis },
  { label: "Event", icon: Calendar, to: DEFINE_ROUTERS.events },
  {
    label: "Config",
    icon: Settings,
    to: DEFINE_ROUTERS.config,
  },
  {
    label: "Notify",
    icon: Megaphone,
    to: DEFINE_ROUTERS.notifications.index,
    children: [
      { label: "List", to: DEFINE_ROUTERS.notifications.index },
      { label: "Create", to: DEFINE_ROUTERS.notifications.create },
    ],
  },
  { label: "Report", icon: MailQuestion, to: DEFINE_ROUTERS.inbox },
];
