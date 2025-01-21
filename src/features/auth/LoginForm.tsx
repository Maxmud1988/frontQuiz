import { Google, LockOpen } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { EmailField, PasswordField } from '../../components/auth';

const LoginForm = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // Статус загрузки

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    // Имитация асинхронного запроса
    setTimeout(() => {
      console.log('Sign UP Success');
      setStatus('idle');
    }, 2000);
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={10}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 2,
          width: 'xs',
        }}
      >
        <Avatar sx={{ margin: 'auto', backgroundColor: 'primary.main', mb: 1 }}>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5" align="center" sx={{ mt: 1 }}>
          {t('form.signInTitle')}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 2 }}
          display="flex"
          flexDirection="column"
          gap={1.5}
        >
          {/* Поле для email */}
          <EmailField label={t('form.email')} placeholder={t('form.email')} />
          {/* Поле для пароля */}
          <PasswordField
            label={t('form.password')}
            placeholder={t('form.password')}
          />

          {/* Кнопка сабмита */}
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            disabled={status === 'loading'}
            startIcon={
              status === 'loading' ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
            sx={{
              mt: 0,
              py: 1,
              '&:hover': {
                backgroundColor: '#269eaa',
              },
            }}
          >
            {status === 'loading' ? t('form.loading') : t('form.signIn')}
          </Button>
          {/* Кнопка для регистрации через Google */}
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<Google />}
            onClick={() => console.log('Sign Up with Google')}
          >
            {t('form.google')}
          </Button>

          {/* Ссылка на авторизацию */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              {t('form.noAccount')}{' '}
              <Link
                to="/signin"
                style={{ textDecoration: 'none', color: '#2ab4c0' }}
              >
                {t('form.signUp')}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
