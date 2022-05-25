import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';
import { useCreateTaskMutation } from 'redux/api/endpoints/tasks';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  CreateTaskFormValues,
  Props,
  AlertState,
} from './CreateTaskForm.types';

import { styled } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';

import {
  Stack,
  TextField,
  Button,
  Typography,
  Autocomplete,
  SvgIcon,
  Snackbar,
  Alert,
} from '@mui/material';
import Modal from 'components/Modal/Modal';

import { ReactComponent as FileIcon } from 'assets/icons/file-plus.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';

import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './CreateTaskForm.validation';

import { useUploadFileMutation } from 'redux/api/endpoints/file';

const Input = styled('input')({
  display: 'none',
});

function CreateTaskFormModal(props: Props) {
  const { handleClose, open, boardId, columnId } = props;
  const { t } = useTranslation();

  const { data: users } = useGetAllUsersQuery();
  const [createTask, createTaskResult] = useCreateTaskMutation();
  const [uploadFile, uploadFileResult] = useUploadFileMutation();

  const [alertState, setAlertState] = useState<AlertState | null>(null);

  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    resolver: yupResolver(schema),
  });

  const fileInputValue = watch('picture');

  const isCorrectFileSelected =
    (fileInputValue ? !!fileInputValue[0] : false) && !errors.picture;

  const onSubmit: SubmitHandler<CreateTaskFormValues> = ({
    member,
    title,
    description,
    ...restData
  }) => {
    // console.log({ member, title, description, ...restData });
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
    uploadFileResult.reset();
  };

  const handleAlertClose = () => {
    setAlertState(null);
  };

  const onSuccess = () => {
    setAlertState({ message: 'Successfuly created task!', color: 'success' });
    handleCloseAndResetForm();
  };

  useEffect(() => {
    if (createTaskResult.isSuccess) {
      const isSuccessfullyCreatedTask =
        createTaskResult.isSuccess && createTaskResult.data;
      const isAnyFile = fileInputValue && fileInputValue[0];
      const shouldUploadFile = isSuccessfullyCreatedTask && isAnyFile;

      if (shouldUploadFile) {
        uploadFile({
          taskId: createTaskResult.data.id,
          file: fileInputValue[0],
        });
      } else {
        onSuccess();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTaskResult.isSuccess]);

  useEffect(() => {
    if (uploadFileResult.isSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFileResult.isSuccess]);

  useEffect(() => {
    if (uploadFileResult.isError || createTaskResult.isError) {
      setAlertState({ message: 'Something went wrong!', color: 'error' });
    }
  }, [uploadFileResult.isError, createTaskResult.isError]);

  return (
    <>
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
            {t(alertState.message)}
          </Alert>
        ) : undefined}
      </Snackbar>
      <Modal
        onClose={handleCloseAndResetForm}
        open={open}
        dialogTitle={t('Create new task')}
        confirmBtnText={t('Create')}
        onConfirm={handleSubmit(onSubmit)}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ rowGap: 3 }}
        >
          <Controller
            control={control}
            name="title"
            defaultValue=""
            render={({
              field: { ref, ...restField },
              fieldState: { error },
            }) => (
              <TextField
                inputRef={ref}
                {...restField}
                label={t('Task name')}
                required
                error={!!error?.message}
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
            render={({
              field: { ref, ...restField },
              fieldState: { error },
            }) => (
              <TextField
                multiline
                minRows={3}
                maxRows={5}
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
                    : t('Example: Dont forget a bag')
                }
                label={t('Task description')}
              />
            )}
          />
          <label htmlFor="contained-button-file">
            <Input
              accept=".png, .jpg, .jpeg"
              id="contained-button-file"
              multiple={false}
              type="file"
              {...register('picture')}
            />
            <Button
              variant="contained"
              component="span"
              color={
                isCorrectFileSelected
                  ? 'success'
                  : errors.picture
                  ? 'error'
                  : 'primary'
              }
              startIcon={isCorrectFileSelected ? <CheckIcon /> : <FileIcon />}
            >
              {t('Upload image')}
            </Button>
            <Typography
              color={errors.picture ? 'error' : 'primary'}
              sx={{
                opacity: errors.picture ? 1 : 0.7,
              }}
            >
              {t('Max file size is 1mb')}
            </Typography>
          </label>
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
                    helperText={
                      error?.message
                        ? t(error.message, { ns: 'validation' })
                        : ''
                    }
                    label={t('Select member')}
                  />
                )}
              />
            )}
          />
        </Stack>
      </Modal>
    </>
  );
}

export default CreateTaskFormModal;
