// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUp, signInUser, fetchCurrentUser, logout } from "../authApi";

interface UserProfile {
  id: string;
  email: string;
  role: string;
  userName: string;
  hash: string;
}

interface AuthState {
  accessToken: string | null;
  user: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;

  // 1) Добавляем поле для глобального сообщения
  globalMessage: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("access_token"),
  user: null,
  status: "idle",
  error: null,

  // 2) Инициализируем значением null
  globalMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // При желании – вручную проставить accessToken
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("access_token", action.payload);
    },
    clearAuth: (state) => {
      state.accessToken = null;
      localStorage.removeItem("access_token");
    },

    // 3) Экшен для установки/очистки globalMessage
    setGlobalMessage: (state, action: PayloadAction<string | null>) => {
      state.globalMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // SignUp
    builder.addCase(signUp.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.accessToken = action.payload.access_token;
      localStorage.setItem("access_token", action.payload.access_token);

      // 4) Записываем успешное сообщение
      // (Можно брать из переводов или констант)
      state.globalMessage = "Registration successful!";
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    // SignIn
    builder.addCase(signInUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      // сохраняем accessToken (если нужно) в localStorage:
      localStorage.setItem("access_token", accessToken);

      // Можете тоже тут что-то ставить, например:
      // state.globalMessage = "Signed in successfully!";
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
    // ====================
    // 2) fetchCurrentUser
    // ====================
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
      state.user = null; // <-- Если ошибка, сбрасываем user
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "idle";
      state.accessToken = null;
      localStorage.removeItem("access_token");
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload as string;
      state.accessToken = null;
      localStorage.removeItem("access_token");
    });
  },
});

export const {
  setAccessToken,
  clearAuth,
  setGlobalMessage, // <-- Экспортируем экшен
} = authSlice.actions;

export default authSlice.reducer;
