// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AuthPage from './features/auth/authPage';
import OAuth2Redirect from './pages/OAuth2Redirect';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/ProtectedRoute';
import SignUpForm from './features/auth/SignUpForm';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PublicRoute>
                <PrivacyPolicy />
              </PublicRoute>
            }
          />
          <Route
            path="/oauth2/redirect"
            element={
              <PublicRoute>
                <OAuth2Redirect />
              </PublicRoute>
            }
          />
          <Route
            path="/oauth2/redirect"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          {/* Пример: защищённая главная, только авторизованным */}
          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <QuizPage />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<SignUpForm />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
