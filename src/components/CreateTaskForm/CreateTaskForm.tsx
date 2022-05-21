import { useTranslation } from 'react-i18next';
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateTaskFormValues } from './CreateTaskForm.types';

import { styled } from '@mui/material/styles';

import {
  Stack,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from '@mui/material';
import Modal from 'components/Modal/Modal';

import { ReactComponent as FileIcon } from 'assets/icons/file-plus.svg';

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
  const { control, handleSubmit, register } = useForm<CreateTaskFormValues>();

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
          name="name"
          defaultValue=""
          render={({ field: { ref, ...restField } }) => (
            <TextField inputRef={ref} {...restField} label={t('Task name')} />
          )}
        />
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field: { ref, ...restField } }) => (
            <TextField
              inputRef={ref}
              {...restField}
              label={t('Task description')}
            />
          )}
        />
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple={false}
            type="file"
            {...register('picture', {})}
          />
          <Button variant="contained" component="span" startIcon={<FileIcon />}>
            {t('Upload image')}
          </Button>
          <Typography sx={{ opacity: 0.7 }}>{t('Max file size')}</Typography>
        </label>
        <Controller
          control={control}
          name="member"
          // defaultValue={{ id: '', name: '', login: '' }}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              fullWidth
              id="create-task-combo-box"
              onChange={(event, item) => {
                onChange(item);
              }}
              value={value ?? null}
              isOptionEqualToValue={(option, value) =>
                option.login === value.login
              }
              options={users ? [...users] : []}
              getOptionLabel={(user) => user.login}
              renderInput={(params) => (
                <TextField {...params} name={name} label={t('Select member')} />
              )}
            />
          )}
        />
      </Stack>
    </Modal>
  );
}

export default CreateTaskFormModal;
