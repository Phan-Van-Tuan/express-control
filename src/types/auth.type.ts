import { IUser } from "./account.types";

export type ILoginRequest = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
};
