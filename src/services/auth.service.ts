import axiosRequest from "../plugins/request";
import { ILogin, IResponseLogin } from "../types/auth.type";
import { IBaseResponse } from "../types/response.type";
import { IUser } from "../types/account.types";

class AuthService {
  private _prefixURL = "api/auth";

  public async login(data: ILogin): Promise<IBaseResponse<IResponseLogin>> {
    try {
      const rs = await axiosRequest.post(`${this._prefixURL}/login`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getProfile(): Promise<IBaseResponse<IUser>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/me`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AuthService;
