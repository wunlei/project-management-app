import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'redux/hooks';
import { setAlertState } from 'redux/global/globalSlice';
import { useCreateColumnMutation } from 'redux/api/endpoints/columns';

import {
  CreateColumnFormInputs,
  CreateColumnFormProps,
} from './CreateColumnForm.types';
import { CreateFormSchema } from './CreateColumnForm.validation';

import { TextField, Alert } from '@mui/material';
import Modal from 'components/Modal/Modal';
import { yupResolver } from '@hookform/resolvers/yup';

function CreateColumnForm(props: CreateColumnFormProps) {
  const { open, onClose, boardId } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [createColumn, createColumnResult] = useCreateColumnMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<CreateColumnFormInputs>({
    resolver: yupResolver(CreateFormSchema),
  });

  const onSubmit: SubmitHandler<CreateColumnFormInputs> = ({ title }) => {
    createColumn({ boardId, body: { title } });
  };

  const handleClose = () => {
    onClose();
    reset();
    createColumnResult.reset();
  };

  useEffect(() => {
    if (createColumnResult.isSuccess) {
      handleClose();
      dispatch(
        setAlertState({
          alertMessage: 'Column successfully created',
          alertType: 'success',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createColumnResult.isSuccess]);

  return (
    <Modal
      open={open}
      dialogTitle={t('Create new column')}
      onClose={handleClose}
      onConfirm={handleSubmit(onSubmit)}
      isLoading={createColumnResult.isLoading}
      isBtnDisabled={!isDirty}
    >
      {createColumnResult.error && (
        <Alert
          severity="error"
          sx={{
            marginBottom: 2,
          }}
        >
          {t('Something went wrong!')}
        </Alert>
      )}
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field: { ref, ...restField }, fieldState: { error } }) => (
          <TextField
            inputRef={ref}
            id="title"
            variant="outlined"
            inputProps={{ maxLength: 30 }}
            required
            sx={{
              minWidth: {
                xs: '100%',
                sm: '300px',
              },
            }}
            disabled={createColumnResult.isLoading}
            {...restField}
            label={t('Title')}
            error={!!error}
            helperText={
              error?.message ? t(error.message, { ns: 'validation' }) : ''
            }
          />
        )}
      />
    </Modal>
  );
}

export default CreateColumnForm;
