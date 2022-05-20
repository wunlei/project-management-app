import { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from 'redux/hooks';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from 'redux/api/endpoints/users';

import { EditProfile, AlertState } from './UpdateUserForm.types';

import {
  Alert,
  Button,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material';

import PasswordInput from 'components/PasswordInput/PasswordInput';

function UpdateUserForm() {
  const userId = useAppSelector((state) => state.global.userId);

  const [alertState, setAlertState] = useState<AlertState | null>(null);

  const { data: user, isLoading } = useGetUserQuery({
    userId: userId ?? undefined,
  });
  const [updateUser, updateUserResult] = useUpdateUserMutation();

  const { control, handleSubmit } = useForm<EditProfile>();

  const onSubmit: SubmitHandler<EditProfile> = (data) => {
    updateUser({ userId: userId ?? undefined, body: data });
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState(null);
  };

  useEffect(() => {
    if (updateUserResult.isSuccess) {
      setAlertState({ color: 'success', message: 'Successfuly updated user!' });
    }
    if (updateUserResult.isError) {
      setAlertState({
        color: 'error',
        message: 'Something went wrong while updating user!',
      });
    }
  }, [updateUserResult]);

  return (
    <>
      <Stack
        spacing={1}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        width={300}
      >
        {isLoading ? (
          <Skeleton height={83} />
        ) : (
          <Controller
            name="name"
            control={control}
            defaultValue={user?.name}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { isTouched, isDirty, error },
              formState,
            }) => (
              <TextField
                id="edit-name"
                label="Name"
                error={!!error?.message}
                name={name}
                value={value}
                helperText={error ? error.message : ' '}
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                inputRef={ref}
              />
            )}
          />
        )}

        {isLoading ? (
          <Skeleton height={83} />
        ) : (
          <Controller
            name="login"
            control={control}
            defaultValue={user?.login}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { isTouched, isDirty, error },
              formState,
            }) => (
              <TextField
                id="edit-login"
                label="Login"
                type="text"
                name={name}
                value={value}
                helperText={error ? error.message : ' '}
                error={!!error?.message}
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                inputRef={ref}
              />
            )}
          />
        )}
        <PasswordInput control={control} name={'password'} required />
        <Button
          type="submit"
          variant="outlined"
          sx={{ textTransform: 'capitalize' }}
        >
          Save
        </Button>
      </Stack>
      <Snackbar
        open={!!alertState}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={handleAlertClose}
      >
        {alertState ? (
          <Alert
            onClose={handleAlertClose}
            severity={alertState.color}
            sx={{ width: '100%' }}
          >
            {alertState.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </>
  );
}

export default UpdateUserForm;
