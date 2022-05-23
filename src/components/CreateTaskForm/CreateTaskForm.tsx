import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateTaskFormValues } from './CreateTaskForm.types';

import { styled } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';

import {
  Stack,
  TextField,
  Button,
  Typography,
  Autocomplete,
  SvgIcon,
} from '@mui/material';
import Modal from 'components/Modal/Modal';

import { ReactComponent as FileIcon } from 'assets/icons/file-plus.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';

import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './CreateTaskForm.validation';

interface Props {
  handleClose: () => void;
  open: boolean;
}

const Input = styled('input')({
  display: 'none',
});

function CreateTaskFormModal(props: Props) {
  const { handleClose, open } = props;
  const { t } = useTranslation();

  const { data: users } = useGetAllUsersQuery();
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    resolver: yupResolver(schema),
  });

  const fileInputValue = watch('picture');

  const isCorrectFileSelected =
    (fileInputValue ? !!fileInputValue[0] : false) && !errors.picture;

  const onSubmit: SubmitHandler<CreateTaskFormValues> = (data) => {
    console.log(data);
  };

  return (
    <Modal
      onClose={handleClose}
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
          render={({ field: { ref, ...restField }, fieldState: { error } }) => (
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
          render={({ field: { ref, ...restField }, fieldState: { error } }) => (
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
            startIcon={
              isCorrectFileSelected ? (
                <SvgIcon>
                  <CheckIcon />
                </SvgIcon>
              ) : (
                <FileIcon />
              )
            }
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
