export interface IBaseResponse<T> {
  data: T;
  success: boolean;
  message: string;
  status: number;
}
