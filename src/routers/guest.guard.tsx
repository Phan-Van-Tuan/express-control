import { FC } from "react";
import { Navigate } from "react-router-dom";
import ChildrenProps from "../types/children.type";
import GeneralLoading from "../components/base/GeneralLoading";
import { DEFINE_ROUTERS } from "../contants/routers-papper";
import useAuth from "../hooks/useAuth";

const GuestGuard: FC<ChildrenProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) return <GeneralLoading isLoading={true} />;
  if (isAuthenticated)
    return <Navigate to={DEFINE_ROUTERS.dashboard} replace />;
  return <>{children}</>;
};

export default GuestGuard;
