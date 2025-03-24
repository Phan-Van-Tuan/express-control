import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/account.types";
import { AuthState } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialize(
      state,
      action: PayloadAction<{ isAuthenticated: boolean; user: any }>
    ) {
      state.isInitialized = true;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    signIn(state, action: PayloadAction<{ user: IUser }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { initialize, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
