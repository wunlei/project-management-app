import React from 'react';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import { Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SuccessColumnsContainer, {
  SuccessColumnsContainerProps,
} from './SuccessColumnsContainer';

interface ColumnsContainerProps
  extends Pick<
    SuccessColumnsContainerProps,
    | 'setIsColumnDeleteConfirmOpen'
    | 'handleSelectColumnId'
    | 'handleCreateTaskModalOpen'
    | 'handleTaskEditModalOpen'
    | 'handleTaskDeleteConfirmOpen'
  > {
  dataGetBoard: BoardFromServerExpanded | undefined;
  isErrorGetBoard: boolean;
  isFetchingGetBoard: boolean;
  boardId: string;
}

function ColumnsContainer(props: ColumnsContainerProps) {
  const { dataGetBoard, isErrorGetBoard, isFetchingGetBoard, ...restProps } =
    props;
  const { t } = useTranslation();

  if (dataGetBoard && dataGetBoard.columns.length !== 0) {
    return (
      <SuccessColumnsContainer {...restProps} dataGetBoard={dataGetBoard} />
    );
  } else if (dataGetBoard && dataGetBoard.columns.length === 0) {
    return (
      <Typography fontSize="2rem" color="primary.light">
        {t('No columns yet')}
      </Typography>
    );
  } else if (isErrorGetBoard && !isFetchingGetBoard) {
    return (
      <Typography fontSize="2rem" color="primary.light">
        {t('Something went wrong!')}
      </Typography>
    );
  } else {
    return <CircularProgress color="secondary" size={100} />;
  }
}

export default React.memo(ColumnsContainer);
