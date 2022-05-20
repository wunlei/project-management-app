export interface ConfirmationDialogProps {
  open: boolean;
  dialogText: string;
  title?: string;
  onReject: () => void;
  onConfirm: () => void;
}
