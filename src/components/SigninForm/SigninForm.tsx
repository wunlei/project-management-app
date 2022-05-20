import { Button, Stack, TextField, Typography } from '@mui/material';
import PasswordInput from 'components/PasswordInput/PasswordInput';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from 'redux/api/endpoints/sign';
import { setUserId } from 'redux/global/globalSlice';
import { useAppDispatch } from 'redux/hooks';

interface LoginData {
  login: string;
  password: string;
}

function LoginForm() {
  const { control, handleSubmit, setError, clearErrors } = useForm<LoginData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [triggerSignIn, signInResult] = useSignInMutation();

  const onSubmit = (data: LoginData) => {
    triggerSignIn({ body: data });
  };

  const handleChange = () => {
    if (signInResult.isError) {
      clearErrors();
    }
  };

  useEffect(() => {
    if (signInResult.isSuccess && signInResult.data) {
      const userId = signInResult.data.id;
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', signInResult.data.token);
      dispatch(setUserId(userId));
      navigate('/');
    }
    if (signInResult.isError) {
      setError('login', { message: '' });
      setError('password', { message: t('Incorrect login or password') });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInResult]);

  // fix attempt works almost perfectly (still doesnt work as desired)
  // when you clear errors on input and than change language
  // error will come back
  // will set error every rerender (thats not good in general)
  // useEffect(() => {
  //   if (signInResult.isError) {
  //     setError('password', { message: t('Incorrect login or password') });
  //   }
  // });

  return (
    <Stack width={300} sx={{ textAlign: 'center' }}>
      <Typography variant="h2" fontWeight={700} mb={1}>
        {t('Welcome back')}
      </Typography>
      <Typography mb={3}>
        {t("Don't have an account?")}{' '}
        <Typography
          component={Link}
          fontWeight={700}
          sx={{
            '&:hover': { textDecoration: 'underline' },
            color: 'inherit',
            textDecoration: 'none',
          }}
          to="/signup"
        >
          {t('Sign Up')}
        </Typography>
      </Typography>
      <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="login"
          control={control}
          defaultValue=""
          rules={{
            required: 'Login is required',
          }}
          render={({
            field: { onChange, ...fieldRest },
            fieldState: { error },
          }) => (
            <TextField
              {...fieldRest}
              onChange={(e) => {
                onChange(e);
                handleChange();
              }}
              label={t('Login')}
              helperText={
                error?.message
                  ? t(error.message, {
                      ns: 'validation',
                    })
                  : ''
              }
              error={!!error}
            />
          )}
        />
        <PasswordInput
          control={control}
          name="password"
          isValidateRequired
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          {t('Sign In')}
        </Button>
      </Stack>
    </Stack>
  );
}

export default LoginForm;
