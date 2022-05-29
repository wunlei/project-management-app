import { TaskFromServerExpanded, UserFromServer } from 'redux/api/apiTypes';

export interface CreateTaskFormProps {
  handleClose: () => void;
  open: boolean;
  boardId: string;
  columnId: string;
}
export interface EditTaskFormProps {
  handleClose: () => void;
  open: boolean;
  task: TaskFromServerExpanded | null;
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
