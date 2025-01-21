// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // ...другие редьюсеры
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
