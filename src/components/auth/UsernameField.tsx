import { TextField, InputAdornment } from '@mui/material';
import { AccountCircleOutlined } from '@mui/icons-material';

const UsernameField = ({
  label = 'Username',
  placeholder = 'Enter your username',
  ...props
}) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleOutlined />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
      {...props}
    />
  );
};

export default UsernameField;
