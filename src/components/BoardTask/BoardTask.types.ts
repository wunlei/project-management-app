import { TaskFromServerExpanded } from 'redux/api/apiTypes';

export type TaskCallback = (task: TaskFromServerExpanded) => void;
export interface BoardTaskProps {
  title: string;
  description?: string;
  isDone: boolean;
  user: string;
  task: TaskFromServerExpanded;
  handleOpenEditModal: TaskCallback;
  handleOpenDeleteConfirmation: TaskCallback;
}
