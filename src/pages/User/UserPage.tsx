import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setUserId } from 'redux/global/globalSlice';
import { useNavigate, Link } from 'react-router-dom';
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from 'redux/api/endpoints/users';

import { EditProfile, AlertState } from './UserPage.types';
import loadingModal from './UserPage.styles';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PasswordInput from 'components/PasswordInput/PasswordInput';

import { ReactComponent as ArrowBack } from 'assets/icons/arrow-left.svg';
import { ReactComponent as Delete } from 'assets/icons/trash.svg';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';

function UserPage() {
  const userId = useAppSelector((state) => state.global.userId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserQuery({
    userId: userId ?? undefined,
  });
  const [updateUser, updateUserResult] = useUpdateUserMutation();
  const [
    deleteUser,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
  ] = useDeleteUserMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alertState, setAlertState] = useState<AlertState | null>(null);

  const { control, handleSubmit } = useForm<EditProfile>();

  const onSubmit: SubmitHandler<EditProfile> = (data) => {
    updateUser({ userId: userId ?? undefined, body: data });
  };

  const handleDeleteProfile = () => {
    if (userId) {
      deleteUser({ userId });
    }
    setIsDialogOpen(false);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState(null);
  };

  useEffect(() => {
    if (updateUserResult.isSuccess) {
      setAlertState({ color: 'success', message: 'Successfuly updated user!' });
    }
    if (updateUserResult.isError) {
      setAlertState({
        color: 'error',
        message: 'Something went wrong while updating user!',
      });
    }
  }, [updateUserResult]);

  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(setUserId(null));
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  return (
    <Container sx={{ flexGrow: 1, pt: 1 }}>
      <Button
        component={Link}
        to={'/projects'}
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
          {isLoading ? (
            <Skeleton height={83} />
          ) : (
            <Controller
              name="name"
              control={control}
              defaultValue={user?.name}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { isTouched, isDirty, error },
                formState,
              }) => (
                <TextField
                  id="edit-name"
                  label="Name"
                  error={!!error?.message}
                  name={name}
                  value={value}
                  helperText={error ? error.message : ' '}
                  onBlur={onBlur} // notify when input is touched
                  onChange={onChange} // send value to hook form
                  inputRef={ref}
                />
              )}
            />
          )}

          {isLoading ? (
            <Skeleton height={83} />
          ) : (
            <Controller
              name="login"
              control={control}
              defaultValue={user?.login}
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
                  value={value}
                  helperText={error ? error.message : ' '}
                  error={!!error?.message}
                  onBlur={onBlur} // notify when input is touched
                  onChange={onChange} // send value to hook form
                  inputRef={ref}
                />
              )}
            />
          )}
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
            onClick={() => setIsDialogOpen(true)}
          >
            delete profile
          </Button>
        </Stack>
      </Stack>
      <ConfirmationDialog
        open={isDialogOpen}
        dialogText={'Confirm deleting profile'}
        onConfirm={handleDeleteProfile}
        onReject={() => {
          setIsDialogOpen(false);
        }}
      />
      <Modal open={isDeleteLoading}>
        <Box style={loadingModal}>
          <CircularProgress color="info" size={200} />
        </Box>
      </Modal>
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
            {alertState.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Container>
  );
}

export default UserPage;
