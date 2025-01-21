// src/pages/AuthPage.tsx
import React from "react";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

import SignIn from "../../pages/SignIn";

const AuthPage: React.FC = () => {
  const location = useLocation(); // Получаем текущий путь
  const isSignIn = location.pathname === "/signin"; // Проверяем, является ли путь входом

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {isSignIn ? <SignIn /> : <RegistrationForm />}
    </Container>
  );
};

export default AuthPage;
