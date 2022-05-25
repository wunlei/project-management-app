import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { setIsAlert } from 'redux/global/globalSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

function AppAlert() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isAlerts = useAppSelector((state) => state.global.isAlerts);
  const alertMessage = useAppSelector((state) => state.global.alertMessage);
  const alertType = useAppSelector((state) => state.global.alertType);

  // const showAppAlert = () => {
  //   dispatch(setIsAlert(true));
  // };

  const handleAppAlertClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setIsAlert(false));
  };

  return (
    <Snackbar
      open={isAlerts}
      autoHideDuration={4000}
      onClose={handleAppAlertClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleAppAlertClose}
        severity={alertType}
        sx={{ width: '100%' }}
      >
        {t(alertMessage)}
      </Alert>
    </Snackbar>
  );
}

export default AppAlert;
