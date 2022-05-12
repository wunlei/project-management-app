import { Button, Container, Stack, TextField, Typography } from '@mui/material';

import { ReactComponent as ArrowBack } from 'assets/icons/arrow-left.svg';
import { ReactComponent as Delete } from 'assets/icons/trash.svg';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import PasswordInput from 'components/PasswordInput/PasswordInput';
import { EditProfile } from './UserPage.types';

function UserPage() {
  const { control, handleSubmit } = useForm<EditProfile>();

  const onSubmit: SubmitHandler<EditProfile> = (data) => console.log(data);

  return (
    <Container>
      <Button
        variant="outlined"
        startIcon={<ArrowBack width={18} height={18} />}
        sx={{ textTransform: 'capitalize', alignSelf: 'flex-start' }}
      >
        Back to projects
      </Button>
      <Stack spacing={1} alignItems="center" mt={3}>
        <Typography variant="h3" mb={3}>
          Edit Profile
        </Typography>

        <Stack
          spacing={1}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          width={300}
        >
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({
              field: { onChange, onBlur, name, ref },
              fieldState: { isTouched, isDirty, error },
              formState,
            }) => (
              <TextField
                id="edit-name"
                label="Name"
                error={!!error?.message}
                name={name}
                helperText={error ? error.message : ' '}
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                inputRef={ref}
              />
            )}
          />
          <Controller
            name="login"
            control={control}
            defaultValue=""
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { isTouched, isDirty, error },
              formState,
            }) => (
              <TextField
                id="edit-login"
                label="Login"
                type="text"
                name={name}
                helperText={error ? error.message : ' '}
                error={!!error?.message}
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                inputRef={ref}
              />
            )}
          />
          <PasswordInput control={control} name={'password'} />
          <Button
            type="submit"
            variant="outlined"
            sx={{ textTransform: 'capitalize' }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="error"
            startIcon={<Delete />}
            sx={{ textTransform: 'uppercase' }}
          >
            delete profile
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default UserPage;
