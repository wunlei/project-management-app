import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { useGetBoardQuery } from 'redux/api/endpoints/boards';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useUpdateTaskMutation } from 'redux/api/endpoints/tasks';
import { useUpdateColumnMutation } from 'redux/api/endpoints/columns';
import {
  BoardFromServerExpanded,
  TaskFromServer,
  ColumnFromServerExpended,
} from 'redux/api/apiTypes';
import createColumnsContainer from './createColumnsContainer';

function BoardPage() {
  const { t } = useTranslation();
  const textAddColumn = t('Add Column');

  const [updateColumn] = useUpdateColumnMutation();
  const [updateTask] = useUpdateTaskMutation();

  const { boardId } = useParams();
  if (!boardId) {
    throw new Error('boardId (url param) is absent');
  }

  const { currentData: currentDataGetBoard, isError: isErrorGetBoard } =
    useGetBoardQuery({ boardId });

  const [dataGetBoard, setDataGetBoard] = useState<
    undefined | BoardFromServerExpanded
  >(currentDataGetBoard);

  const columnsContainerJSX = useMemo(
    () =>
      createColumnsContainer({
        dataGetBoard,
        isErrorGetBoard,
        textAddColumn,
      }),
    [dataGetBoard, isErrorGetBoard, textAddColumn]
  );

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if (!dataGetBoard) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const cloneDataGetBoard = JSON.parse(
      JSON.stringify(dataGetBoard)
    ) as BoardFromServerExpanded;

    switch (type) {
      case 'column': {
        const relatedColumn = dataGetBoard.columns.find(
          (column) => column.id === draggableId
        );
        if (!relatedColumn) {
          throw new Error(`cannot find related column by 'draggableId'`);
        }

        // async change

        updateColumn({
          boardId: dataGetBoard.id,
          columnId: draggableId,
          body: { title: relatedColumn.title, order: destination.index + 1 },
        });

        // sync change (working with a deep copy of dataGetBoard, relatedColumn)

        const cloneRelatedColumn = JSON.parse(
          JSON.stringify(relatedColumn)
        ) as ColumnFromServerExpended;

        cloneDataGetBoard.columns.splice(source.index, 1);
        cloneDataGetBoard.columns.splice(
          destination.index,
          0,
          cloneRelatedColumn
        );

        cloneDataGetBoard.columns.forEach((column, index) => {
          column.order = index + 1;
        });

        setDataGetBoard(cloneDataGetBoard);

        break;
      }

      case 'task': {
        let relatedTask: TaskFromServer | undefined;
        dataGetBoard.columns.some((column) => {
          return (relatedTask = column.tasks.find(
            (task) => task.id === draggableId
          ));
        });
        if (!relatedTask) {
          throw new Error(`cannot find related task by 'draggableId'`);
        }

        // async change

        updateTask({
          boardId: dataGetBoard.id,
          columnId: source.droppableId,
          taskId: draggableId,
          body: {
            boardId: dataGetBoard.id,
            columnId: destination.droppableId,
            description: relatedTask.description,
            title: relatedTask.title,
            order: destination.index + 1,
          },
        });

        // sync change (working with a deep copy of dataGetBoard, relatedTask)

        const cloneRelatedTask = JSON.parse(
          JSON.stringify(relatedTask)
        ) as TaskFromServer;

        const sourceColumn = cloneDataGetBoard.columns.find(
          (column) => column.id === source.droppableId
        );
        const destinationColumn = cloneDataGetBoard.columns.find(
          (column) => column.id === destination.droppableId
        );
        if (!sourceColumn || !destinationColumn) {
          throw new Error('no related sourceColumn or destinationColumn');
        }

        sourceColumn.tasks.splice(source.index, 1);
        destinationColumn.tasks.splice(destination.index, 0, cloneRelatedTask);

        sourceColumn.tasks.forEach((task, index) => {
          task.order = index + 1;
        });
        destinationColumn.tasks.forEach((task, index) => {
          task.order = index + 1;
        });

        setDataGetBoard(cloneDataGetBoard);

        break;
      }
    }
  };

  useEffect(() => {
    setDataGetBoard(currentDataGetBoard);
  }, [currentDataGetBoard]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        component="main"
        spacing={1}
        padding="1rem"
        paddingTop="0"
        sx={{ overflow: 'hidden' }}
        flex={1}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          component="nav"
          flexWrap="wrap"
          sx={{
            padding: 1,
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'primary.main',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Link to={'/projects'}>
              <IconButton color="primary">
                <ArrowIcon />
              </IconButton>
            </Link>
            <Typography variant="h4">
              {dataGetBoard && dataGetBoard.title}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button variant="contained" startIcon={<PlusIcon />}>
              {t('Add Column')}
            </Button>
          </Stack>
        </Stack>
        {columnsContainerJSX}
      </Stack>
    </DragDropContext>
  );
}

export default BoardPage;
