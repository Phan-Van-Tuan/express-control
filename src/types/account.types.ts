export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  rating: number | null;
  cancelPercent: number | null;
  aesKey?: string;
  avatar: string | null;
  role: "user" | "driver" | "admin" | "owner ";
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
