export interface AuthState {
  user: { id: string; username: string; email: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}
