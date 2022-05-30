import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useUpdateBoardMutation } from 'redux/api/endpoints/boards';
import { useAppDispatch } from 'redux/hooks';
import { setAlertState } from 'redux/global/globalSlice';
import { EditProjectFormProps } from './EditProjectForm.types';
import {
  ProjectInputs,
  ProjectSchema,
} from 'components/CreateProjectForm/CreateProjectForm.validation';
import Modal from 'components/Modal/Modal';

function EditProjectForm(props: EditProjectFormProps) {
  const { open, onClose, projectData } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [updateBoard, updateBoardResult] = useUpdateBoardMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProjectInputs>({
    resolver: yupResolver(ProjectSchema),
  });

  const onSubmit: SubmitHandler<ProjectInputs> = (data) => {
    if (data && projectData) {
      updateBoard({
        boardId: projectData.boardId,
        body: {
          title: data.title,
          description: data.description || ' ',
        },
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (updateBoardResult.isSuccess) {
      handleClose();
      dispatch(
        setAlertState({
          alertMessage: 'Project successfully updated',
          alertType: 'success',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateBoardResult.isSuccess]);

  useEffect(() => {
    reset();
  }, [projectData, reset]);

  return (
    <Modal
      open={open}
      dialogTitle={t('Edit Project')}
      onClose={handleClose}
      onConfirm={handleSubmit(onSubmit)}
      isBtnDisabled={!isDirty}
      isLoading={updateBoardResult.isLoading}
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
        {(updateBoardResult.error || !projectData) && (
          <Alert severity="error">{t('Something went wrong!')}</Alert>
        )}
        {projectData && (
          <>
            <Controller
              name="title"
              control={control}
              defaultValue={projectData.title}
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
                  disabled={updateBoardResult.isLoading}
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
              defaultValue={projectData.description}
              render={({ field: { onChange, ...restField } }) => (
                <TextField
                  id="description"
                  label={t('Description')}
                  variant="outlined"
                  multiline
                  inputProps={{
                    maxLength: 60,
                  }}
                  disabled={updateBoardResult.isLoading}
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
          </>
        )}
      </Stack>
    </Modal>
  );
}

export default EditProjectForm;
