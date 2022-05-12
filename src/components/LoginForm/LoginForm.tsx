import { Button, Stack, TextField, Typography } from '@mui/material';
import PasswordInput from 'components/PasswordInput/PasswordInput';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface LoginData {
  login: string;
  password: string;
}

function LoginForm() {
  const { control, handleSubmit } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => console.log(data);

  return (
    <Stack width={300} sx={{ textAlign: 'center' }}>
      <Typography variant="h2" fontWeight={700} mb={1}>
        Welcome back
      </Typography>
      <Typography mb={3}>
        Don&apos;t have an account?{' '}
        <Typography
          component="b"
          fontWeight={700}
          sx={{ '&:hover': { textDecoration: 'underline' } }}
        >
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to="/signup"
          >
            Sign up
          </Link>
        </Typography>
      </Typography>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="login"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Login"
              helperText={error ? error.message : ' '}
              error={!!error}
            />
          )}
        />
        <PasswordInput control={control} name="password" />
        <Button type="submit" variant="contained">
          Sign in
        </Button>
      </Stack>
    </Stack>
  );
}

export default LoginForm;
