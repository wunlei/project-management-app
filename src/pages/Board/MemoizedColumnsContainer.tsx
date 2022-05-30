import React from 'react';
import { useTranslation } from 'react-i18next';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import { Typography, Stack } from '@mui/material';
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
      <Stack textAlign="center">
        <Typography fontSize="2rem" color="primary.light">
          {t('No columns yet')}
        </Typography>
      </Stack>
    );
  } else if (isErrorGetBoard && !isFetchingGetBoard) {
    return (
      <Stack textAlign="center">
        <Typography fontSize="2rem" color="primary.light">
          {t('Something went wrong!')}
        </Typography>
      </Stack>
    );
  } else {
    return <Stack></Stack>;
  }
}

export default React.memo(ColumnsContainer);
