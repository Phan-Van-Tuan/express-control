import { IUser } from "./account.types";

export interface ILogin {
  phone: string;
  password: string;
  role: string;
}

export interface IResponseLogin {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
