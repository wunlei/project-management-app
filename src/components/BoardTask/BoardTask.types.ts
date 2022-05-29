import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { TaskFromServerExpanded } from 'redux/api/apiTypes';

export interface BoardTaskProps {
  task: TaskFromServerExpanded;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  isDragging?: boolean;
  innerRef?: () => void;
}
