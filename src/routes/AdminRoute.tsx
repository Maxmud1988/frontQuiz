// src/routes/AdminRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";

interface Props {
  children: React.ReactNode;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const role = useAppSelector((state) => state.auth.user?.role);

  if (!accessToken) {
    // Не авторизован
    return <Navigate to="/signin" replace />;
  }

  if (role !== "admin") {
    // Авторизован, но не админ
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
