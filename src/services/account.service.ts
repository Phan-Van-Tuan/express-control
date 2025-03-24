import axiosRequest from "../plugins/request";
import { IBaseResponse } from "../types/response.type";
import { IResponseGetCountAccounts, IUser } from "../types/account.types";

class AccountService {
  private _prefixURL = "api/account";

  public async getCountAccount(): Promise<
    IBaseResponse<IResponseGetCountAccounts>
  > {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/count`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getProfile(): Promise<IBaseResponse<IUser>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/profile`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AccountService;
