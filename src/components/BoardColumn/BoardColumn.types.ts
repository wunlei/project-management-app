import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

import { UpdateColumnArg } from 'redux/api/apiTypes';
export interface BoardColumnProps {
  children?: React.ReactNode;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  innerRef?: () => void;
  columnData: UpdateColumnArg;
  setIsColumnDeleteConfirmOpen: () => void;
  handleSelectColumnId: (columnId: string) => void;
  handleCreateTaskModalOpen: () => void;
}
