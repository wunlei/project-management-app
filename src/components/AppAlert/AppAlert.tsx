import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { setAlertState } from 'redux/global/globalSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

function AppAlert() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const alertState = useAppSelector((state) => state.global.alertState);

  const handleAppAlertClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAlertState(null));
  };

  return (
    <Snackbar
      open={Boolean(alertState)}
      autoHideDuration={4000}
      onClose={handleAppAlertClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {alertState ? (
        <Alert
          onClose={handleAppAlertClose}
          severity={alertState.alertType}
          sx={{ width: '100%' }}
        >
          {t(alertState.alertMessage)}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
}

export default AppAlert;
