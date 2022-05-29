import { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { setAlertState } from 'redux/global/globalSlice';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ColumnTitleSchema } from './TitleEditor.validation';
import { IconButton, Stack, TextField } from '@mui/material';
import { ColumnInputs, TitleEditorProps } from './TitleEditor.types';
import { useUpdateColumnMutation } from 'redux/api/endpoints/columns';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';

function TitleEditor(props: TitleEditorProps) {
  const {
    columnData: {
      boardId,
      columnId,
      body: { title, order },
    },
    handleClose,
  } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [updateColumn, updateColumnResult] = useUpdateColumnMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ColumnInputs>({
    resolver: yupResolver(ColumnTitleSchema),
  });

  const onSubmit: SubmitHandler<ColumnInputs> = (data) => {
    updateColumn({
      boardId,
      columnId,
      body: { order, title: data.title },
    });
  };

  useEffect(() => {
    if (updateColumnResult.isSuccess) {
      handleClose();
      dispatch(
        setAlertState({
          alertMessage: 'Column title successfully updated',
          alertType: 'success',
        })
      );
    }
    if (updateColumnResult.isError) {
      dispatch(
        setAlertState({
          alertMessage: 'Something went wrong!',
          alertType: 'error',
        })
      );
    }
  }, [
    updateColumnResult.isSuccess,
    updateColumnResult.isError,
    handleClose,
    dispatch,
  ]);

  return (
    <Stack
      component="form"
      direction="row"
      alignItems="center"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="title"
        control={control}
        defaultValue={title}
        render={({ field }) => (
          <TextField
            id="title"
            label={t('Title')}
            variant="outlined"
            required
            inputProps={{
              maxLength: 30,
            }}
            disabled={updateColumnResult.isLoading}
            {...field}
            error={Boolean(errors.title?.message)}
            helperText={
              errors.title?.message
                ? t(errors.title.message, {
                    ns: 'validation',
                  })
                : ''
            }
          ></TextField>
        )}
      />
      <Stack direction="row" height="fit-content">
        <IconButton
          type="submit"
          color="success"
          disabled={updateColumnResult.isLoading}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={handleClose}
          disabled={updateColumnResult.isLoading}
        >
          <CrossIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default TitleEditor;
