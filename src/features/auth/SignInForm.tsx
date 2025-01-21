import React from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import EmailIcon from '@mui/icons-material/Email';
import PasswordField from '../../components/auth/PasswordField';
import { signinSchema } from '../../schemas/signinSchema';
import { SignInFormValues } from '../../types/SignInFormValues';
import { Link } from 'react-router-dom';
// ! Рекомендуется вынести URL бэкенда в ENV или константу
const BACKEND_URL = 'http://localhost:3000';
/**
 * Теперь форма не содержит внутреннего стейта для
 * - isLoading,
 * - Snackbar (ошибки/успеха),
 * всё это передаётся извне через props.
 */
interface SignInFormProps {
  onSubmit: (data: SignInFormValues) => void; // или Promise<void>, если нужно
  loading: boolean; // показывает, что запрос в процессе
  error?: string; // текст ошибки для отображения, если есть
  successMessage?: string; // если вы хотите показывать успех
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  loading,
  error,
  successMessage,
}) => {
  const { t } = useTranslation();

  // react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = (data: SignInFormValues) => {
    onSubmit(data);
  };
  // Функция для кнопки "Зарегистрироваться через Google"
  const handleGoogleSignUp = () => {
    // Перенаправляем на серверный эндпоинт OAuth (Nest, Express и т.д.)
    window.location.href = `${BACKEND_URL}/auth/google`;
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
          {t('form.signInTitle')}
        </Typography>

        {/* Если есть глобальная ошибка — покажем её */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Если нужно показывать успех */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

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

        {/* Кнопка входа */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
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
          {loading ? t('form.loading') : t('form.signInButton')}
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

        {/* Ссылка на регистрацию */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            {t('form.noAccount')}{' '}
            <Link
              to="/signup"
              style={{ textDecoration: 'none', color: '#2ab4c0' }}
            >
              {t('form.signUp')}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInForm;
