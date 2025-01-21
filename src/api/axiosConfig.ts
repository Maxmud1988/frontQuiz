// src/api/axios.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: string) => void;
  reject: (reason?: Error) => void;
}[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  console.log(`Processing ${failedQueue.length} queued requests`);
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error ?? undefined);
    }
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: "http://localhost:3000", // ваш бэкенд
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // если сервер использует HttpOnly cookie для refresh
});

/** Запрос на обновление токена */
const refreshAccessToken = async (): Promise<string> => {
  try {
    const { data } = await api.post<{ access_token: string }>(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    const { access_token } = data;
    localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (err) {
    console.error("Failed to refresh access token:", err);
    throw err;
  }
};

// Перехватчик запросов: добавляем токен, если есть
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Перехватчик ответов: при 401 пробуем рефрешить токен
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Если нет конфига запроса или статус != 401 — отдаём ошибку
    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Чтобы не рефрешить токен повторно для одного и того же запроса
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    // Если рефреш уже идёт, ставим текущий запрос в очередь
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers && token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    // Иначе запускаем рефреш
    isRefreshing = true;
    try {
      const newToken = await refreshAccessToken();
      processQueue(null, newToken);
      isRefreshing = false;

      if (originalRequest.headers && newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError, null);
      isRefreshing = false;

      // Если рефреш не удался — удаляем токен, редиректим на /signin
      localStorage.removeItem("access_token");
      window.location.href = "/signin";
      return Promise.reject(refreshError);
    }
  }
);

export default api;
