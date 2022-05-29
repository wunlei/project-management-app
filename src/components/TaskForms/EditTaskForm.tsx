import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';
import { useUpdateTaskMutation } from 'redux/api/endpoints/tasks';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import grey from '@mui/material/colors/grey';

import { Stack, TextField, Autocomplete } from '@mui/material';
import Modal from 'components/Modal/Modal';

import { yupResolver } from '@hookform/resolvers/yup';
import { CreateTaskFormValues, EditTaskFormProps } from './TaskForms.types';
import { schema } from './TaskForms.validation';

import { useAppDispatch } from 'redux/hooks';
import { setAlertState } from 'redux/global/globalSlice';

function EditTaskFormModal(props: EditTaskFormProps) {
  const { handleClose, open, task } = props;
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { data: users } = useGetAllUsersQuery();
  const [updateTask, updateTaskResult] = useUpdateTaskMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<CreateTaskFormValues>({
    resolver: yupResolver(schema),
  });

  const taskUser = useMemo(() => {
    const emptyUser = { id: '', login: '', name: '' };
    if (task && task.userId && users) {
      const foundUser = users.find((user) => user.id === task.userId);

      return foundUser ? foundUser : emptyUser;
    } else {
      return emptyUser;
    }
  }, [users, task]);

  const onSubmit: SubmitHandler<CreateTaskFormValues> = ({
    member,
    title,
    description,
  }) => {
    if (task) {
      updateTask({
        taskId: task.id,
        columnId: task.columnId,
        boardId: task.boardId,
        body: {
          title,
          description,
          order: task.order,
          userId: member.id,
          columnId: task.columnId,
          boardId: task.boardId,
        },
      });
    }
  };

  const handleCloseAndResetForm = () => {
    handleClose();
    reset();
    updateTaskResult.reset();
  };

  const onClose = () => {
    if (!updateTaskResult.isLoading) {
      handleCloseAndResetForm();
    }
  };

  useEffect(() => {
    if (updateTaskResult.isSuccess) {
      dispatch(
        setAlertState({
          alertMessage: 'Successfully updated task!',
          alertType: 'success',
        })
      );

      handleCloseAndResetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTaskResult.isSuccess]);

  useEffect(() => {
    if (updateTaskResult.isError) {
      dispatch(
        setAlertState({
          alertMessage: 'Something went wrong!',
          alertType: 'error',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTaskResult.isError]);

  useEffect(() => {
    reset();
  }, [reset, task]);

  return (
    <Modal
      onClose={onClose}
      open={open}
      dialogTitle={t('Edit task')}
      confirmBtnText={t('Update')}
      onConfirm={handleSubmit(onSubmit)}
      isLoading={updateTaskResult.isLoading}
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="title"
          defaultValue={task ? task.title : ''}
          render={({ field: { ref, ...restField }, fieldState: { error } }) => (
            <TextField
              inputRef={ref}
              {...restField}
              label={t('Task name')}
              required
              error={!!error?.message}
              inputProps={{ maxLength: 30 }}
              disabled={updateTaskResult.isLoading}
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
          defaultValue={task ? task.description : ''}
          render={({ field: { ref, ...restField }, fieldState: { error } }) => (
            <TextField
              multiline
              minRows={5}
              maxRows={5}
              inputProps={{ maxLength: 500 }}
              disabled={updateTaskResult.isLoading}
              sx={{
                '.MuiInputBase-inputMultiline': {
                  scrollbarColor: `${grey[400]} ${grey[200]}`,
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': {
                    width: '10px',
                    left: '-10px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: grey[200],
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: grey[400],
                  },
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
          defaultValue={taskUser}
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
              disabled={updateTaskResult.isLoading}
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
                  disabled={updateTaskResult.isLoading}
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

export default EditTaskFormModal;
