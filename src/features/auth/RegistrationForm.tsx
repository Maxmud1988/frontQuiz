import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PasswordField from '../../components/auth/PasswordField';
import { registrationSchema } from '../../schemas/registrationSchema';
import { RegistrationFormValues } from '../../types/registrationTypes';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../features/auth/authApi';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

// ! Рекомендуется вынести URL бэкенда в ENV или константу
const BACKEND_URL = 'http://localhost:3000';

const RegistrationForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status } = useAppSelector((state) => state.auth);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Функция для кнопки "Зарегистрироваться через Google"
  const handleGoogleSignUp = () => {
    // Перенаправляем на серверный эндпоинт OAuth (Nest, Express и т.д.)
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  const handleFormSubmit = async (data: RegistrationFormValues) => {
    setSnackbar({ open: false, message: '', severity: 'success' });

    const resultAction = await dispatch(
      signUp({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );

    if (signUp.fulfilled.match(resultAction)) {
      // Успешная регистрация → на страницу входа
      navigate('/signin');
    } else {
      // Ошибка
      const errorMsg = resultAction.payload || t('errors.unknownError');
      setSnackbar({
        open: true,
        message: String(errorMsg),
        severity: 'error',
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#fff',
          p: 2,
          borderRadius: 2,
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 2, color: '#2ab4c0' }}
        >
          {t('form.title')}
        </Typography>

        {/* Поле username */}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('form.username')}
              placeholder={t('form.username')}
              autoComplete="username"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Поле Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('form.email')}
              placeholder={t('form.email')}
              autoComplete="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Поле Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordField
              {...field}
              label={t('form.password')}
              placeholder={t('form.password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        {/* Поле Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordField
              {...field}
              label={t('form.confirmPassword')}
              placeholder={t('form.confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />

        {/* Чекбокс - подтверждение условий */}
        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={
                <Typography variant="body2" sx={{ display: 'inline' }}>
                  {t('form.termsPrefix')}{' '}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    style={{ textDecoration: 'none', color: '#2ab4c0' }}
                  >
                    {t('form.privacyPolicy')}
                  </Link>
                </Typography>
              }
            />
          )}
        />
        {errors.terms && (
          <Typography variant="caption" color="error" display="block">
            {errors.terms.message}
          </Typography>
        )}

        {/* Кнопка сабмита */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={status === 'loading'}
          startIcon={
            status === 'loading' ? (
              <CircularProgress size={20} color="inherit" />
            ) : null
          }
          sx={{
            backgroundColor: '#2ab4c0',
            mt: 2,
            py: 1,
            '&:hover': {
              backgroundColor: '#269eaa',
            },
          }}
        >
          {status === 'loading' ? t('form.loading') : t('form.submit')}
        </Button>

        {/* Кнопка "Зарегистрироваться через Google" */}
        <Button
          type="button"
          fullWidth
          variant="outlined"
          onClick={handleGoogleSignUp}
          sx={{
            mt: 2,
            py: 1,
            borderColor: '#2ab4c0',
            color: '#2ab4c0',
            '&:hover': {
              backgroundColor: 'rgba(42,180,192,0.08)',
              borderColor: '#2ab4c0',
            },
          }}
        >
          {t('form.google')}
        </Button>

        {/* Ссылка на вход */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            {t('form.alreadyHaveAccount')}{' '}
            <Link
              to="/signin"
              style={{ textDecoration: 'none', color: '#2ab4c0' }}
            >
              {t('form.signIn')}
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Snackbar для уведомлений */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegistrationForm;
