import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

export interface BoardColumnProps {
  children?: React.ReactNode;
  title: string;
  innerRef: () => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
  id: string;
}
