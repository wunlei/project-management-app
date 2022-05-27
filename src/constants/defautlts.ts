import { TaskFromServerExpanded } from 'redux/api/apiTypes';

export const emptyTask: TaskFromServerExpanded = {
  id: '',
  userId: null,
  title: '',
  order: 0,
  description: '',
  files: [],
  boardId: '',
  columnId: '',
};
