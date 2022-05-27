import { UserFromServer } from 'redux/api/apiTypes';

export interface Props {
  handleClose: () => void;
  open: boolean;
  boardId: string;
  columnId: string;
}

export interface AlertState {
  message: string;
  color: 'success' | 'error';
}

export interface CreateTaskFormValues {
  title: string;
  description: string;
  member: UserFromServer;
}
