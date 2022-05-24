import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { TaskFromServer } from 'redux/api/apiTypes';

export interface BoardTaskProps {
  task: TaskFromServer;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  innerRef?: () => void;
}
