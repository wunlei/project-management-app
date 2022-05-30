import { UpdateColumnArg } from 'redux/api/apiTypes';

export interface TitleEditorProps {
  columnData: UpdateColumnArg;
  handleClose: () => void;
}

export interface ColumnInputs {
  title: string;
}
