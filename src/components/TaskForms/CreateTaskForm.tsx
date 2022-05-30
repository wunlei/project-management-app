import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';
import { useCreateTaskMutation } from 'redux/api/endpoints/tasks';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import grey from '@mui/material/colors/grey';

import { Stack, TextField, Autocomplete } from '@mui/material';
import Modal from 'components/Modal/Modal';

import { yupResolver } from '@hookform/resolvers/yup';
import { CreateTaskFormValues, CreateTaskFormProps } from './TaskForms.types';
import { schema } from './TaskForms.validation';

import { useAppDispatch } from 'redux/hooks';
import { setAlertState } from 'redux/global/globalSlice';
import scrollStyle from 'styles/scrollStyle';

function CreateTaskFormModal(props: CreateTaskFormProps) {
  const { handleClose, open, boardId, columnId } = props;
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { data: users } = useGetAllUsersQuery();
  const [createTask, createTaskResult] = useCreateTaskMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<CreateTaskFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateTaskFormValues> = ({
    member,
    title,
    description,
    ...restData
  }) => {
    createTask({
      boardId,
      columnId,
      body: {
        title,
        description: description ? description : ' ',
        userId: member.id,
      },
    });
  };

  const handleCloseAndResetForm = () => {
    handleClose();
    reset();
    createTaskResult.reset();
  };

  const onClose = () => {
    if (!createTaskResult.isLoading) {
      handleCloseAndResetForm();
    }
  };

  useEffect(() => {
    if (createTaskResult.isSuccess) {
      dispatch(
        setAlertState({
          alertMessage: 'Successfully created task!',
          alertType: 'success',
        })
      );

      handleCloseAndResetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTaskResult.isSuccess]);

  useEffect(() => {
    if (createTaskResult.isError) {
      dispatch(
        setAlertState({
          alertMessage: 'Something went wrong!',
          alertType: 'error',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTaskResult.isError]);

  return (
    <Modal
      onClose={onClose}
      open={open}
      dialogTitle={t('Create new task')}
      confirmBtnText={t('Create')}
      onConfirm={handleSubmit(onSubmit)}
      isLoading={createTaskResult.isLoading}
      isBtnDisabled={!isDirty}
    >
      <Stack
        component="form"
        sx={{
          rowGap: 3,
          minWidth: {
            xs: '100%',
            sm: '300px',
          },
        }}
      >
        <Controller
          control={control}
          name="title"
          defaultValue=""
          render={({ field: { ref, ...restField }, fieldState: { error } }) => (
            <TextField
              inputRef={ref}
              {...restField}
              label={t('Task name')}
              required
              error={!!error?.message}
              inputProps={{ maxLength: 30 }}
              disabled={createTaskResult.isLoading}
              helperText={
                error?.message
                  ? t(error.message, { ns: 'validation' })
                  : t('Example: Buy milk')
              }
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field: { ref, ...restField }, fieldState: { error } }) => (
            <TextField
              multiline
              minRows={5}
              maxRows={5}
              inputProps={{ maxLength: 500 }}
              disabled={createTaskResult.isLoading}
              sx={{
                '& .MuiInputBase-inputMultiline': {
                  ...scrollStyle,
                  paddingRight: 1,
                },
                '& .MuiInputBase-root': {
                  paddingRight: 0,
                },
              }}
              inputRef={ref}
              {...restField}
              error={!!error?.message}
              helperText={
                error?.message
                  ? t(error.message, { ns: 'validation' })
                  : t("Example: Don't forget to take a bag")
              }
              label={t('Task description')}
            />
          )}
        />
        <Controller
          control={control}
          name="member"
          defaultValue={{ id: '', name: '', login: '' }}
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <Autocomplete
              fullWidth
              id="create-task-combo-box"
              onChange={(event, item) => {
                onChange(item);
              }}
              disabled={createTaskResult.isLoading}
              value={value ?? null}
              isOptionEqualToValue={(option, value) =>
                option.login === value.login || value.login === ''
              }
              options={users ? [...users] : []}
              getOptionLabel={(user) => user.login}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name={name}
                  error={!!error?.message}
                  required
                  disabled={createTaskResult.isLoading}
                  helperText={
                    error?.message ? t(error.message, { ns: 'validation' }) : ''
                  }
                  label={t('Select member')}
                />
              )}
            />
          )}
        />
      </Stack>
    </Modal>
  );
}

export default CreateTaskFormModal;
