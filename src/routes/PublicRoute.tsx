// src/routes/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";

interface Props {
  children: React.ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (accessToken) {
    // Пользователь уже авторизован, значит нет смысла пускать на логин/регистрацию
    return <Navigate to="/" replace />;
  }

  // Иначе отдать компонент
  return <>{children}</>;
};

export default PublicRoute;
