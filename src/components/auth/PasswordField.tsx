import React, { useState } from 'react';
import {
  TextField,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
} from '@mui/icons-material';

interface PasswordFieldProps extends Omit<TextFieldProps, 'type'> {
  // Можно добавить любые дополнительные пропсы, если нужно
  dataTestId?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  dataTestId,
  label,
  placeholder,
  error,
  helperText,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      {...rest}
      // Если showPassword == true, тогда поле "text", иначе "password"
      type={showPassword ? 'text' : 'password'}
      label={label}
      placeholder={placeholder}
      // Стили, как в примере
      fullWidth
      margin="none"
      autoComplete="new-password"
      // Тест ID для удобства тестирования
      inputProps={{
        'data-testid': dataTestId,
      }}
      error={!!error}
      helperText={helperText}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordField;
