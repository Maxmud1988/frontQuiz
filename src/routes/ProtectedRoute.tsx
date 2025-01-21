import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    isRefreshing: boolean;
  }
}
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import useAppSelector from "../hooks/useAppSelector";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { accessToken, user, status } = useAppSelector((state) => state.auth);
  const [isWaitingForRefresh, setIsWaitingForRefresh] = useState(false);

  useEffect(() => {
    // Проверяем, идёт ли процесс обновления токена
    if (window.isRefreshing) {
      setIsWaitingForRefresh(true);
      const interval = setInterval(() => {
        if (!window.isRefreshing) {
          setIsWaitingForRefresh(false);
          clearInterval(interval);
        }
      }, 100);
    }
  }, []);

  if (!accessToken) {
    // Если токена нет, перенаправляем на /signin
    return <Navigate to="/signin" replace />;
  }

  if (status === "loading" || isWaitingForRefresh) {
    console.log('status === "loading"', user);
    // Если данные пользователя загружаются или идёт обновление токена
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed" || !user) {
    // Если ошибка или пользователь не загружен

    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
