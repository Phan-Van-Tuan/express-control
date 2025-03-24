import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import loadingReducer from "./slices/loadingSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
