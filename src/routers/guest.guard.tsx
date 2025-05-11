import { FC } from "react";
import { Navigate } from "react-router-dom";
import ChildrenProps from "../types/children.type";
import GeneralLoading from "../components/base/GeneralLoading";
import { DEFINE_ROUTERS } from "../contants/routers-papper";
import { useAuth } from "../hooks/use-auth";

const GuestGuard: FC<ChildrenProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <GeneralLoading isLoading={true} />;
  if (user) return <Navigate to={DEFINE_ROUTERS.dashboard} replace />;
  return <>{children}</>;
};

export default GuestGuard;
