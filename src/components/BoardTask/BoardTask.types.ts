import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

import { TaskFromServerExpanded } from 'redux/api/apiTypes';
export type TaskCallback = (task: TaskFromServerExpanded) => void;

export interface BoardTaskProps {
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  isDragging?: boolean;
  innerRef?: () => void;
  user: string;
  task: TaskFromServerExpanded;
  handleTaskEditModalOpen: TaskCallback;
  handleTaskDeleteConfirmOpen: TaskCallback;
}
