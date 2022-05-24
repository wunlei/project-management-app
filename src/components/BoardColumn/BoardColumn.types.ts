import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

export interface BoardColumnProps {
  children?: React.ReactNode;
  title: string;
  id: string;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  innerRef?: () => void;
}
