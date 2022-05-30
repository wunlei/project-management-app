import { useTranslation } from 'react-i18next';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
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
    isBtnDisabled,
    isLoading,
  } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          boxShadow: 0,
          padding: 2,
          borderRadius: fullScreen ? 0 : '1rem',
        },
      }}
      aria-labelledby="dialog-title"
    >
      <IconButton
        onClick={onClose}
        disabled={isLoading}
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
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" disabled={isLoading}>
          {rejectText || t('Cancel')}
        </Button>

        <Button
          onClick={onConfirm}
          variant="outlined"
          disabled={isBtnDisabled || isLoading}
          endIcon={isLoading && <CircularProgress size={10} thickness={5} />}
        >
          {confirmText || t('Save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Modal;
