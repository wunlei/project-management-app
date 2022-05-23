import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignInMutation, useSignUpMutation } from 'redux/api/endpoints/sign';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useTranslation } from 'react-i18next';
import { UserInputs, userValidationSchema } from 'constants/validation';
import PasswordInput from 'components/PasswordInput/PasswordInput';

function getErrorMessage(status: FetchBaseQueryError['status']) {
  switch (status) {
    default:
      return 'Something went wrong';
  }
}

function SignupForm() {
  const { t } = useTranslation();

  const [errorCode, setErrorCode] = useState<
    FetchBaseQueryError['status'] | null
  >(null);

  const [signUp, signUpResult] = useSignUpMutation();
  const [signIn, signInResult] = useSignInMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserInputs>({ resolver: yupResolver(userValidationSchema) });

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    // signUp({ body: { ...data } });
    console.log(data);
  };

  return (
    <Stack spacing={3} width="300px" textAlign="center">
      <Typography variant="h2" fontWeight={700} mb={1}>
        Sign Up
      </Typography>
      {errorCode && (
        <Alert severity="error">{getErrorMessage(errorCode)}</Alert>
      )}
      <Typography>
        Already have an account?{' '}
        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          fontWeight="bold"
        >
          Sign In
        </Link>
      </Typography>
      <Stack component={'form'} noValidate spacing={2}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              required
              disabled={signUpResult.isLoading || signInResult.isLoading}
              {...field}
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
              label="Login"
              variant="outlined"
              required
              disabled={signUpResult.isLoading || signInResult.isLoading}
              {...field}
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
          disabled={signUpResult.isLoading || signInResult.isLoading}
          control={control}
          required={true}
          name={'password'}
        ></PasswordInput>
      </Stack>
      <Button
        type="submit"
        variant="contained"
        disabled={signUpResult.isLoading || signInResult.isLoading}
        onClick={handleSubmit(onSubmit)}
        startIcon={
          (signUpResult.isLoading || signInResult.isLoading) && (
            <CircularProgress size={10} thickness={5} />
          )
        }
      >
        Sign Up
      </Button>
    </Stack>
  );
}

export default SignupForm;
