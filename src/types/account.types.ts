export interface IUser {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  rating: number | null;
  cancelPercent: number | null;
  aesKey?: string;
  avatar: string | null;
  role: IRole;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface IQueryUser {
  page: number;
  limit: number;
  total: number;
  nameLike: string;
}

export interface IResponseGetCountAccounts {
  user: number;
  driver: number;
  admin: number;
}

export type IRole = "user" | "driver" | "admin" | "owner ";
