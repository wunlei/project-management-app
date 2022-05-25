import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCreateBoardMutation } from 'redux/api/endpoints/boards';
import { CreateProjectFormProps } from './CreateProjectForm.types';
import { ProjectInputs, ProjectSchema } from './CreateProjectForm.validation';
import Modal from 'components/Modal/Modal';
import { useAppDispatch } from 'redux/hooks';
import {
  setAlertMessage,
  setAlertType,
  setIsAlert,
} from 'redux/global/globalSlice';

function CreateProjectForm(props: CreateProjectFormProps) {
  const { open, onClose } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [createBoard, createBoardResult] = useCreateBoardMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProjectInputs>({
    resolver: yupResolver(ProjectSchema),
  });

  const onSubmit: SubmitHandler<ProjectInputs> = (data) => {
    createBoard({
      body: { title: data.title, description: data.description || ' ' },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (createBoardResult.isSuccess) {
      handleClose();
      dispatch(setAlertType('success'));
      dispatch(setAlertMessage('Project successfully created'));
      dispatch(setIsAlert(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createBoardResult.isSuccess]);

  return (
    <Modal
      open={open}
      dialogTitle={t('Create New Project')}
      onClose={handleClose}
      onConfirm={handleSubmit(onSubmit)}
      isBtnDisabled={!isDirty}
      isLoading={createBoardResult.isLoading}
    >
      <Stack
        spacing={2}
        sx={{
          minWidth: {
            xs: '100%',
            sm: '300px',
          },
        }}
        component="form"
      >
        {createBoardResult.error && (
          <Alert severity="error">{t('Something went wrong!')}</Alert>
        )}
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field: { onChange, ...restField } }) => (
            <TextField
              multiline
              id="title"
              label={t('Title')}
              variant="outlined"
              required
              inputProps={{
                maxLength: 30,
              }}
              disabled={createBoardResult.isLoading}
              onChange={(e) => {
                onChange(e);
              }}
              {...restField}
              error={Boolean(errors.title?.message)}
              helperText={
                errors.title?.message
                  ? t(errors.title.message, {
                      ns: 'validation',
                    })
                  : ''
              }
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field: { onChange, ...restField } }) => (
            <TextField
              id="description"
              label={t('Description')}
              variant="outlined"
              multiline
              inputProps={{
                maxLength: 60,
              }}
              disabled={createBoardResult.isLoading}
              onChange={(e) => {
                onChange(e);
              }}
              {...restField}
              error={Boolean(errors.description?.message)}
              helperText={
                errors.description?.message
                  ? t(errors.description.message, {
                      ns: 'validation',
                    })
                  : ''
              }
            />
          )}
        />
      </Stack>
    </Modal>
  );
}

export default CreateProjectForm;
