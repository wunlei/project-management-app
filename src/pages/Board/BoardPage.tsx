import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { useGetBoardQuery } from 'redux/api/endpoints/boards';
import { DragDropContext } from 'react-beautiful-dnd';
import { useUpdateTaskMutation } from 'redux/api/endpoints/tasks';
import { useUpdateColumnMutation } from 'redux/api/endpoints/columns';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import getOnDragEnd from './getOnDragEnd';
import MemoizedColumnsContainer from './MemoizedColumnsContainer';

function BoardPage() {
  const { t } = useTranslation();

  const [updateColumn] = useUpdateColumnMutation();
  const [updateTask] = useUpdateTaskMutation();

  const { boardId } = useParams();
  if (!boardId) {
    throw new Error('boardId (url param) is absent');
  }

  const {
    currentData: currentDataGetBoard,
    isError: isErrorGetBoard,
    isFetching: isFetchingGetBoard,
  } = useGetBoardQuery({ boardId });

  const [dataGetBoard, setDataGetBoard] = useState<
    undefined | BoardFromServerExpanded
  >(currentDataGetBoard);

  const onDragEnd = getOnDragEnd({
    dataGetBoard,
    updateTask,
    updateColumn,
    setDataGetBoard,
  });

  useEffect(() => {
    setDataGetBoard(currentDataGetBoard);
  }, [currentDataGetBoard]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        component="main"
        padding="1rem"
        sx={{
          paddingTop: {
            xs: '165px',
            sm: '120px',
          },
          paddingBottom: {
            xs: '94px',
            sm: '54px',
          },
        }}
        height={'calc(100vh - 17px)'}
        flex={1}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          component="nav"
          flexWrap="wrap"
          sx={{
            position: 'fixed',
            top: '64px',
            left: 0,
            width: '100%',
            padding: '0.5rem 0.625rem',
            backgroundColor: 'white',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'primary.main',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Link to={'/projects'}>
              <IconButton color="primary">
                <ArrowIcon />
              </IconButton>
            </Link>
            <Typography
              title={dataGetBoard && dataGetBoard.title}
              variant="h4"
              sx={{
                maxWidth: {
                  xs: '250px',
                  sm: '380px',
                },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {dataGetBoard && dataGetBoard.title}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button variant="contained" startIcon={<PlusIcon />}>
              {t('Add Column')}
            </Button>
          </Stack>
        </Stack>
        <MemoizedColumnsContainer
          dataGetBoard={dataGetBoard}
          isErrorGetBoard={isErrorGetBoard}
          isFetchingGetBoard={isFetchingGetBoard}
        />
      </Stack>
    </DragDropContext>
  );
}

export default BoardPage;
