// src/features/auth/authApi.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

// Типы для SignUp
interface SignUpArgs {
  username: string;
  email: string;
  password: string;
}
interface Tokens {
  access_token: string;
  refresh_token: string;
}

// Регистрация (signup)
/**
 * Пример структуры ответа при ошибке валидации:
 * {
 *   "statusCode": 400,
 *   "message": [
 *       "Email must not be empty",
 *       "Password must be 6+ characters"
 *   ],
 *   "error": "Bad Request"
 * }
 *
 * Пример структуры ответа при конфликте (email уже существует):
 * {
 *   "statusCode": 409,
 *   "message": "Email already exists",
 *   "error": "Conflict"
 * }
 */

export const signUp = createAsyncThunk<Tokens, SignUpArgs>(
  "auth/signUp",
  async (args, { rejectWithValue }) => {
    try {
      // Пытаемся сделать запрос на регистрацию
      const { data } = await axiosInstance.post<Tokens>("/auth/signup", args);
      return data; // { access_token, refresh_token } — например
    } catch (error: any) {
      // Смотрим, что пришло от сервера
      const errorData = error.response?.data;

      // Если сервер вовсе не ответил (нет response), возвращаем, например,
      // сообщение "Network error" или что-то подобное
      if (!errorData) {
        return rejectWithValue(error.message || "Network error");
      }

      // =============================
      // 1. Если у нас массив ошибок (валидация полей),
      //    например ["Email is invalid", "Password is too short"]
      // =============================
      if (Array.isArray(errorData.message)) {
        // Склеим все ошибки в одну строку через запятую или перенос строки
        const combinedMsg = errorData.message.join(", ");
        return rejectWithValue(combinedMsg);
      }

      // =============================
      // 2. Если у нас единственное сообщение (например, "Email already exists")
      // =============================
      if (typeof errorData.message === "string") {
        return rejectWithValue(errorData.message);
      }

      // =============================
      // 3. На всякий случай fallback,
      //    если структура неизвестная или нет поля message
      // =============================
      return rejectWithValue("Unknown error");
    }
  }
);

interface SignInArgs {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

// Запрос на авторизацию
export const signInUser = createAsyncThunk<SignInResponse, SignInArgs>(
  "auth/signInUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // POST /auth/signin
      // Предположим, сервер при успешном входе возвращает:
      // { accessToken: "...", refreshToken: "..." }
      const response = await axiosInstance.post<SignInResponse>(
        "/auth/signin",
        {
          email,
          password,
        }
      );

      return response.data;
    } catch (error: any) {
      // Возвращаем строку с ошибкой:
      const errorData = error.response?.data;
      const message =
        errorData?.message || error.message || "Unknown login error";
      return rejectWithValue(message);
    }
  }
);

// Запрос на получение инфо о пользователе
interface UserProfile {
  id: string;
  email: string;
  role: string;
  userName: string;
  hash: string;

  // ...другие поля профиля
}

export const fetchCurrentUser = createAsyncThunk<UserProfile>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      // GET /users/me
      const response = await axiosInstance.get<UserProfile>("/users/me");
      return response.data;
    } catch (error: any) {
      const errorData = error.response?.data;
      const message =
        errorData?.message || error.message || "Cannot fetch user info";
      return rejectWithValue(message);
    }
  }
);

// Логаут
export const logout = createAsyncThunk<void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      // Сервер удалит cookie с refresh_token.
      // access_token мы сами удаляем на фронте.
      return;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
