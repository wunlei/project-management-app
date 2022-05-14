export interface ConfirmationDialogProps {
  open: boolean;
  dialogText: string;
  onReject: () => void;
  onConfirm: () => void;
}
