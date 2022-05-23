import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setToken, setUserId } from 'redux/global/globalSlice';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from 'redux/api/endpoints/users';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  Stack,
  Typography,
} from '@mui/material';

import { ReactComponent as ArrowBack } from 'assets/icons/arrow-left.svg';
import { ReactComponent as Delete } from 'assets/icons/trash.svg';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';
import UpdateUserForm from 'components/UpdateUserForm/UpdateUserForm';

function UserPage() {
  const userId = useAppSelector((state) => state.global.userId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [
    deleteUser,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
  ] = useDeleteUserMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteProfile = () => {
    if (userId) {
      deleteUser({ userId });
    }
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(setUserId(null));
      dispatch(setToken(null));
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess]);

  return (
    <Container sx={{ flexGrow: 1, pt: 1 }}>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        variant="outlined"
        startIcon={<ArrowBack width={18} height={18} />}
        sx={{ textTransform: 'capitalize', alignSelf: 'flex-start' }}
      >
        {t('Back')}
      </Button>
      <Stack spacing={1} alignItems="center" mt={3}>
        <Typography variant="h3" mb={3}>
          {`${t('Edit')} ${t('Profile').toLowerCase()}`}
        </Typography>
        <UpdateUserForm />
        <Button
          variant="outlined"
          fullWidth
          color="error"
          startIcon={<Delete />}
          sx={{ textTransform: 'capitalize', maxWidth: 300 }}
          onClick={() => setIsDialogOpen(true)}
        >
          {`${t('Delete')} ${t('Profile').toLowerCase()}`}
        </Button>
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
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress color="secondary" size={100} />
        </Box>
      </Modal>
    </Container>
  );
}

export default UserPage;
