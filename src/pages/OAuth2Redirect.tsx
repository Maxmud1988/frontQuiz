// src/pages/OAuth2Redirect.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Если у вас Redux, можно заодно сделать dispatch(setAccessToken(action.payload))
//import { useAppDispatch } from "../hooks/useAppDispatch";
//import { setAccessToken } from "../features/auth/authSlice";

const OAuth2Redirect: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch(); // если нужно записать в Redux

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      // 1. Сохраняем в localStorage (или sessionStorage)
      localStorage.setItem("access_token", accessToken);

      // 2. Если используете Redux, можете сделать:
      // dispatch(setAccessToken(accessToken));

      // 3. Чистим query-параметры (чтобы при F5 не было ?access_token=...)
      navigate("/", { replace: true });
    } else {
      // Если нет токена в query, перенаправим на логин или куда-нибудь
      navigate("/signin", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      {/* Можно показать "Loading..." на мгновение, пока useEffect не отработал */}
      Redirecting...
    </div>
  );
};

export default OAuth2Redirect;
