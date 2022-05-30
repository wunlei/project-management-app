import { UpdateColumnArg } from 'redux/api/apiTypes';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

export interface BoardColumnProps {
  children?: React.ReactNode;
  columnData: UpdateColumnArg;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  innerRef?: () => void;
  setIsColumnDeleteConfirmOpen: () => void;
  handleSelectColumnId: (columnId: string) => void;
  handleCreateTaskModalOpen: () => void;
}
