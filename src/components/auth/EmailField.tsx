import { TextField, InputAdornment } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';

const EmailField = ({
  label = 'Email',
  placeholder = 'Enter your email',
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
              <EmailOutlined />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
      {...props}
    />
  );
};

export default EmailField;
