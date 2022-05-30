import { UpdateColumnArg } from 'redux/api/apiTypes';

export interface BoardColumnProps {
  children?: React.ReactNode;
  columnData: UpdateColumnArg;
  setIsColumnDeleteConfirmOpen: () => void;
  handleSelectColumnId: (columnId: string) => void;
  handleCreateTaskModalOpen: () => void;
}
