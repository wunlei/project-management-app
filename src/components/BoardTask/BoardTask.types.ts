import { TaskFromServerExpanded } from 'redux/api/apiTypes';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

export type TaskCallback = (task: TaskFromServerExpanded) => void;
export interface BoardTaskProps {
  user: string;
  task: TaskFromServerExpanded;
  isDragging?: boolean;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  innerRef?: () => void;
  handleTaskEditModalOpen: TaskCallback;
  handleTaskDeleteConfirmOpen: TaskCallback;
}
