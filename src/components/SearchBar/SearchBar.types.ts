import { BoardFromServerExpanded } from 'redux/api/apiTypes';

export interface SearchBarProps {
  boards: BoardFromServerExpanded[] | undefined;
}
