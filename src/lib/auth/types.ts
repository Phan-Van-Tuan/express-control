import { IUser } from "../../types/account.types";
import { IResponseLogin } from "../../types/auth.type";

export interface AuthState {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user: IUser | null;
}

export interface AuthContextType extends AuthState {
  signIn: (user: IResponseLogin) => void;
  signOut: () => void;
}
