import { createContext, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialize, signIn, signOut } from "./slice";
import { AuthContextType } from "./types";
import AuthService from "../../services/auth.service";
import ChildrenProps from "../../types/children.type";
import storage, { KEYSTORE } from "../../plugins/storage";
import { RootState } from "../store";
import { IResponseLogin } from "../../types/auth.type";
import useTabEvents from "../../hooks/useTabEvents";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../../types/account.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authService = new AuthService();

const AuthProvider: FC<ChildrenProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isInitialized, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Dùng useQuery với caching
  const { data: cachedUser, isFetching } = useQuery<IUser>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      console.log("Fetching profile from API");
      const response = await authService.getProfile();
      return response.data;
    },
    enabled: !!localStorage.getItem("ACCESS_TOKEN") && !user, // Chỉ chạy nếu chưa có user
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 30 * 60 * 1000, // 30 phút
    initialData: user || undefined, // Dùng dữ liệu từ Redux nếu đã có
  });

  const checkAuthState = async () => {
    if (user || isInitialized) return; // Không chạy lại nếu đã có user hoặc đã khởi tạo

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      dispatch(initialize({ isAuthenticated: false, user: null }));
      return;
    }

    try {
      const profile = cachedUser || (await authService.getProfile()).data;
      dispatch(initialize({ isAuthenticated: true, user: profile }));
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      dispatch(initialize({ isAuthenticated: false, user: null }));
    }
  };

  useEffect(() => {
    console.log("Cached user:", cachedUser, "isFetching:", isFetching);
    checkAuthState();
  }, [dispatch, cachedUser]);

  useTabEvents({
    onTabVisible: checkAuthState,
    onTabFocus: checkAuthState,
  });

  const handleSignIn = (data: IResponseLogin) => {
    storage.set(KEYSTORE.ACCESS_TOKEN, data.accessToken);
    storage.set(KEYSTORE.REFRESH_TOKEN, data.refreshToken);
    dispatch(signIn({ user: data.user }));
  };

  const handleSignOut = () => {
    storage.remove(KEYSTORE.ACCESS_TOKEN);
    storage.remove(KEYSTORE.REFRESH_TOKEN);
    dispatch(signOut());
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    isInitialized,
    user,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
