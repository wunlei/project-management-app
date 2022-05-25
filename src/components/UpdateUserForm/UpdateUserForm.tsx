import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from 'redux/api/endpoints/users';
import { useTranslation } from 'react-i18next';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userValidationSchema } from 'constants/validation';

import { EditProfile } from './UpdateUserForm.types';

import { Button, Skeleton, Stack, TextField } from '@mui/material';

import PasswordInput from 'components/PasswordInput/PasswordInput';
import { setAlertState } from 'redux/global/globalSlice';

function UpdateUserForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.global.userId);

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery({
    userId: userId ?? undefined,
  });
  const [updateUser, updateUserResult] = useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<EditProfile>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(userValidationSchema),
  });

  const onSubmit: SubmitHandler<EditProfile> = (data) => {
    updateUser({ userId: userId ?? undefined, body: data });
  };

  useEffect(() => {
    if (updateUserResult.isSuccess) {
      dispatch(
        setAlertState({
          alertMessage: 'Successfully updated profile!',
          alertType: 'success',
        })
      );
    }
    if (updateUserResult.isError) {
      dispatch(
        setAlertState({
          alertMessage: 'Something went wrong while updating profile!',
          alertType: 'error',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserResult]);
  useEffect(() => {
    if (isError) {
      dispatch(
        setAlertState({
          alertMessage: 'Something went wrong while updating profile!',
          alertType: 'error',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <>
      <Stack
        spacing={3}
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
              formState: { errors },
            }) => (
              <TextField
                id="edit-name"
                label={t('Name')}
                error={!!error?.message}
                name={name}
                value={value}
                helperText={
                  errors.name?.message //errors.login?.message
                    ? t(errors.name.message, {
                        ns: 'validation',
                      })
                    : ''
                }
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
              formState: { errors },
            }) => (
              <TextField
                id="edit-login"
                label={t('Login')}
                type="text"
                name={name}
                value={value}
                helperText={
                  errors.login?.message //errors.login?.message
                    ? t(errors.login.message, {
                        ns: 'validation',
                      })
                    : ''
                }
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
          disabled={!isDirty}
        >
          {t('Save')}
        </Button>
      </Stack>
    </>
  );
}

export default UpdateUserForm;
