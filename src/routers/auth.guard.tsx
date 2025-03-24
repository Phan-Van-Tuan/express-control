import { Navigate } from "react-router-dom";
import { FC } from "react";
import GeneralLoading from "../components/base/GeneralLoading";
import ChildrenProps from "../types/children.type";
import { DEFINE_ROUTERS } from "../contants/routers-papper";
import useAuth from "../hooks/useAuth";

const AuthGuard: FC<ChildrenProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) return <GeneralLoading isLoading={true} />;
  if (!isAuthenticated) return <Navigate to={DEFINE_ROUTERS.login} replace />;
  return <>{children}</>;
};

export default AuthGuard;
