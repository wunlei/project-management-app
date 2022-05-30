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
  const { open, dialogText, title, onConfirm, onReject } = props;
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
        {title || t('Confirm Action')}
      </DialogTitle>
      <DialogContent
        id="confirmation-dialog-description"
        sx={{
          textAlign: 'center',
        }}
      >
        {dialogText}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button
          onClick={onReject}
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 'bold' }}
        >
          {t('Cancel')}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{ fontWeight: 'bold' }}
        >
          {t('Confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ConfirmationDialog;
