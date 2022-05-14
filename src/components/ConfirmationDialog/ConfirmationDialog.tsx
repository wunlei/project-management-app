import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { ConfirmationDialogProps } from './ConfirmationDialog.types';

function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { open, dialogText, onConfirm, onReject } = props;
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          boxShadow: 0,
          padding: 2,
          borderRadius: '1rem',
        },
      }}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle
        id="confirmation-dialog-title"
        fontWeight="bold"
        variant="h4"
        textAlign="center"
      >
        {t('Confirm Action')}
      </DialogTitle>
      <DialogContent id="confirmation-dialog-description">
        {dialogText}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button onClick={onConfirm} color="success" variant="outlined">
          {t('Confirm')}
        </Button>
        <Button onClick={onReject} color="error" variant="contained">
          {t('Cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ConfirmationDialog;
