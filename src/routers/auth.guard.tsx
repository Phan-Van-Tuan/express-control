import { Navigate } from "react-router-dom";
import { FC } from "react";
import GeneralLoading from "../components/base/GeneralLoading";
import ChildrenProps from "../types/children.type";
import { DEFINE_ROUTERS } from "../contants/routers-papper";
import { useAuth } from "../hooks/use-auth";

const AuthGuard: FC<ChildrenProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <GeneralLoading isLoading={true} />;
  if (!user) return <Navigate to={DEFINE_ROUTERS.login} replace />;
  return <>{children}</>;
};

export default AuthGuard;
