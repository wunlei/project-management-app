import { UpdateColumnArg } from 'redux/api/apiTypes';

export interface BoardColumnProps {
  children?: React.ReactNode;
  columnData: UpdateColumnArg;
  setIsConfirmationOpen: (value: boolean) => void;
  handleSelectColumnId: (columnId: string) => void;
}
