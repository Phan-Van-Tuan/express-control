import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, login } from "../../services/userService";
import { AuthState } from "../../models/user";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// Thunk dùng chung để tạo request
const createAsyncAction = (
  type: string,
  serviceFn: (data: any) => Promise<any>
) =>
  createAsyncThunk(type, async (data: any, { rejectWithValue }) => {
    try {
      const response = await serviceFn(data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error: any) {
      return rejectWithValue(error.message || "Có lỗi xảy ra");
    }
  });

export const registerUser = createAsyncAction("auth/register", register);
export const loginUser = createAsyncAction("auth/login", login);

// Hàm tiện ích để xử lý trạng thái chung
const handleAsyncStates = (builder: any, action: any) => {
  builder
    .addCase(action.pending, (state: AuthState) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(action.fulfilled, (state: AuthState, action: any) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      console.log(action.payload.token);
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    })
    .addCase(action.rejected, (state: AuthState, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    handleAsyncStates(builder, registerUser);
    handleAsyncStates(builder, loginUser);
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
