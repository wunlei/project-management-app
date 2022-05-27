import { TaskFromServerExpanded } from 'redux/api/apiTypes';

export interface BoardTaskProps {
  title: string;
  description?: string;
  isDone: boolean;
  user: string;
  task: TaskFromServerExpanded;
  handleSelectTask: (task: TaskFromServerExpanded) => void;
  handleToggleEditTaskModal: () => void;
}
