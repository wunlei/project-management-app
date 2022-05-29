export interface BoardColumnProps {
  children?: React.ReactNode;
  title: string;
  columnId: string;
  boardId: string;
  handleSelectColumnId: (columnId: string) => void;
}
