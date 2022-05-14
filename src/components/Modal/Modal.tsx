import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { ModalProps } from './Modal.types';
import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg';

function Modal(props: ModalProps) {
  const {
    open,
    children,
    dialogTitle,
    onClose,
    onConfirm,
    confirmBtnText: confirmText,
    rejectBtnText: rejectText,
  } = props;
  const { t } = useTranslation();

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          boxShadow: 0,
          padding: 2,
          borderRadius: '1rem',
        },
      }}
      aria-labelledby="dialog-title"
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '0.25rem',
          right: '0.25rem',
        }}
      >
        <CrossIcon />
      </IconButton>
      <DialogTitle
        id="dialog-title"
        variant="h4"
        fontWeight="bold"
        textAlign="center"
      >
        {dialogTitle}
      </DialogTitle>

      <DialogContent dividers>
        <div>{children}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          {rejectText || t('Cancel')}
        </Button>
        <Button onClick={onConfirm} variant="outlined">
          {confirmText || t('Save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Modal;
