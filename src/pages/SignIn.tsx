// src/pages/SignIn.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

import { signInUser, fetchCurrentUser } from "../features/auth/authApi";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import SignInForm from "../features/auth/SignInForm";
import { setGlobalMessage } from "../features/auth/slice/authSlice";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, error, globalMessage } = useAppSelector(
    (state) => state.auth
  );

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  useEffect(() => {
    if (globalMessage) {
      setSnackbar({
        open: true,
        message: globalMessage,
        severity: "success",
      });
      dispatch(setGlobalMessage(null));
    } else if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
    }
  }, [globalMessage, error, dispatch]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSignIn = async (formData: {
    email: string;
    password: string;
  }) => {
    const signInResult = await dispatch(signInUser(formData));

    if (signInUser.fulfilled.match(signInResult)) {
      const meResult = await dispatch(fetchCurrentUser());
      if (fetchCurrentUser.fulfilled.match(meResult)) {
        console.log("User after signIn:", meResult.payload); // <-- Логируем пользователя
        navigate("/");
      } else {
        setSnackbar({
          open: true,
          message: "Failed to load user information.",
          severity: "error",
        });
        console.error("Failed to fetch user information.");
      }
    } else {
      setSnackbar({
        open: true,
        message: "Sign-in failed. Please check your credentials.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <SignInForm
        onSubmit={handleSignIn}
        loading={status === "loading"}
        error={error || undefined}
      />

      {/* Snackbar для уведомлений */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignIn;
