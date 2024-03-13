export interface ModalProps {
  open: boolean;
  children?: React.ReactNode;
  dialogTitle: string;
  confirmBtnText?: string;
  rejectBtnText?: string;
  onClose: () => void;
  onConfirm?: () => void;
  isBtnDisabled?: boolean;
  isLoading?: boolean;
}
