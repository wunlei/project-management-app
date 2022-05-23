import { useEffect, useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignInMutation, useSignUpMutation } from 'redux/api/endpoints/sign';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useTranslation } from 'react-i18next';
import { UserInputs, userValidationSchema } from 'constants/validation';
import PasswordInput from 'components/PasswordInput/PasswordInput';
import { setToken, setUserId } from 'redux/global/globalSlice';
import { useAppDispatch } from 'redux/hooks';

function getErrorMessage(status: FetchBaseQueryError['status']) {
  switch (status) {
    default:
      return 'Something went wrong!';
  }
}

function SignupForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [errorCode, setErrorCode] = useState<
    FetchBaseQueryError['status'] | null
  >(null);
  const [isHasErrors, setIsHasErrors] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [signUp, signUpResult] = useSignUpMutation();
  const [signIn, signInResult] = useSignInMutation();

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<UserInputs>({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    resolver: yupResolver(userValidationSchema),
  });

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    signUp({ body: { ...data } });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = event.target.name as 'name' | 'login' | 'password';
    clearErrors(name);
    if (Object.keys(errors).length === 0) {
      setIsHasErrors(false);
    } else {
      setIsHasErrors(true);
    }
  };

  useEffect(() => {
    if (signUpResult.isSuccess) {
      setIsDisabled(true);
      if (signUpResult.originalArgs) {
        signIn({
          body: {
            login: signUpResult.originalArgs?.body.login,
            password: signUpResult.originalArgs?.body.password,
          },
        });
      }
    }
  }, [signIn, signUpResult.isSuccess, signUpResult.originalArgs]);

  useEffect(() => {
    if (signInResult.isSuccess) {
      setIsDisabled(true);
      if (signInResult.data) {
        dispatch(setToken(signInResult.data.token));
        dispatch(setUserId(signInResult.data.id));
        navigate('/projects');
      }
    }
  }, [dispatch, navigate, signInResult.data, signInResult.isSuccess]);

  useEffect(() => {
    if (signUpResult.error) {
      if ('status' in signUpResult.error) {
        if (signUpResult.error.status === 409) {
          setError('login', {
            type: 'custom',
            message: 'This user already exists',
          });
        } else {
          setErrorCode(signUpResult.error.status);
        }
      } else if (signInResult.error) {
        if ('status' in signInResult.error) {
          setErrorCode(signInResult.error.status);
        }
      }
    }
  }, [signUpResult.error, signInResult.error, setError]);

  return (
    <Stack
      spacing={3}
      width="300px"
      textAlign="center"
      component={'form'}
      noValidate
    >
      <Typography variant="h2" fontWeight={700} mb={1}>
        {t('Sign Up')}
      </Typography>
      {errorCode && (
        <Alert severity="error">{t(getErrorMessage(errorCode))}</Alert>
      )}
      <Typography>
        {t('Already have an account?')}{' '}
        <Link
          component={RouterLink}
          to="/signin"
          underline="hover"
          fontWeight="bold"
        >
          {t('Sign In')}
        </Link>
      </Typography>
      <Stack spacing={2}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              id="name"
              label={t('Name')}
              variant="outlined"
              required
              disabled={
                signUpResult.isLoading || signInResult.isLoading || isDisabled
              }
              {...field}
              onChange={(e) => {
                handleInputChange(e);
                field.onChange(e);
              }}
              error={Boolean(errors.name?.message)}
              helperText={
                errors.name?.message
                  ? t(errors.name.message, {
                      ns: 'validation',
                    })
                  : ''
              }
            ></TextField>
          )}
        />
        <Controller
          name="login"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              id="login"
              label={t('Login')}
              variant="outlined"
              required
              disabled={
                signUpResult.isLoading || signInResult.isLoading || isDisabled
              }
              {...field}
              onChange={(e) => {
                handleInputChange(e);
                field.onChange(e);
              }}
              error={Boolean(errors.login?.message)}
              helperText={
                errors.login?.message
                  ? t(errors.login.message, {
                      ns: 'validation',
                    })
                  : ''
              }
            ></TextField>
          )}
        />
        <PasswordInput
          disabled={
            signUpResult.isLoading || signInResult.isLoading || isDisabled
          }
          control={control}
          required={true}
          name={'password'}
          onChange={(e) => {
            if (e) {
              handleInputChange(e);
            }
          }}
        ></PasswordInput>
      </Stack>
      <Button
        type="submit"
        variant="contained"
        disabled={
          !isDirty ||
          isHasErrors ||
          isDisabled ||
          signUpResult.isLoading ||
          signInResult.isLoading
        }
        onClick={handleSubmit(onSubmit)}
        startIcon={
          (signUpResult.isLoading || signInResult.isLoading) && (
            <CircularProgress size={10} thickness={5} />
          )
        }
      >
        {t('Sign Up')}
      </Button>
    </Stack>
  );
}

export default SignupForm;
