import React from 'react';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import { Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SuccessColumnsContainer from './SuccessColumnsContainer';
import ServerError from '../../utils/errors/ServerError';

function ColumnsContainer({
  dataGetBoard,
  isErrorGetBoard,
}: {
  dataGetBoard: BoardFromServerExpanded | undefined;
  isErrorGetBoard: boolean;
}) {
  const { t } = useTranslation();

  if (dataGetBoard && dataGetBoard.columns.length !== 0) {
    return <SuccessColumnsContainer dataGetBoard={dataGetBoard} />;
  } else if (dataGetBoard && dataGetBoard.columns.length === 0) {
    return (
      <Typography fontSize="2rem" color="primary.light">
        {t('No columns yet')}
      </Typography>
    );
  } else if (isErrorGetBoard) {
    throw new ServerError();
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    );
  }
}

export default React.memo(ColumnsContainer);
