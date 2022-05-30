import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useSignInMutation } from 'redux/api/endpoints/sign';
import { setToken, setUserId } from 'redux/global/globalSlice';
import { useAppDispatch } from 'redux/hooks';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import PasswordInput from 'components/PasswordInput/PasswordInput';
import { SigninData, AlertState } from './SigninForm.types';

function SigninForm() {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isDirty },
  } = useForm<SigninData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [triggerSignIn, signInResult] = useSignInMutation();
  const [alertState, setAlertState] = useState<AlertState | null>(null);

  const onSubmit = (data: SigninData) => {
    triggerSignIn({ body: data });
  };

  const handleChange = () => {
    if (signInResult.isError) {
      clearErrors();
      setIsDisabled(false);
    }
  };

  const handleErrors = () => {
    if (signInResult.error) {
      setIsDisabled(true);
      const isKnownError =
        'status' in signInResult.error && signInResult.error.status === 403;
      if (isKnownError) {
        setError('login', { message: '' });
        setError('password', {
          type: 'value',
          message: 'Incorrect login or password',
        });
        setAlertState(null);
      } else {
        setAlertState({ message: t('Something went wrong!') });
      }
    }
  };

  useEffect(() => {
    if (signInResult.isSuccess && signInResult.data) {
      const userId = signInResult.data.id;
      const token = signInResult.data.token;
      dispatch(setUserId(userId));
      dispatch(setToken(token));
      navigate('/projects');
    }
    if (signInResult.isError) {
      handleErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInResult]);

  return (
    <Stack width={300} sx={{ textAlign: 'center' }}>
      <Typography variant="h2" fontWeight={700} mb={1}>
        {t('Welcome back')}
      </Typography>
      <Typography mb={3}>
        {t("Don't have an account?")}{' '}
        <Link
          component={RouterLink}
          fontWeight={700}
          underline="hover"
          to="/signup"
        >
          {t('Sign Up')}
        </Link>
      </Typography>
      <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
        {alertState ? <Alert color="error">{alertState.message}</Alert> : null}
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
              disabled={signInResult.isLoading}
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
          disabled={signInResult.isLoading}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={signInResult.isLoading || !isDirty || isDisabled}
          startIcon={
            signInResult.isLoading && (
              <CircularProgress size={10} thickness={5} />
            )
          }
        >
          {t('Sign In')}
        </Button>
      </Stack>
    </Stack>
  );
}

export default SigninForm;
