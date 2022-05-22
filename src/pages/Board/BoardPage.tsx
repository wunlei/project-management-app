import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import BoardTask from 'components/BoardTask/BoardTask';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import grey from '@mui/material/colors/grey';
import { useGetBoardQuery } from 'redux/api/endpoints/boards';
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from 'react-beautiful-dnd';
import { useUpdateTaskMutation } from 'redux/api/endpoints/tasks';
import { useUpdateColumnMutation } from 'redux/api/endpoints/columns';
import './boardPage.css';
import {
  BoardFromServerExpanded,
  TaskFromServer,
  ColumnFromServerExpended,
} from 'redux/api/apiTypes';

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
    isSuccess: isSuccessGetBoard,
    isLoading: isLoadingGetBoard,
  } = useGetBoardQuery({ boardId });

  // const dataGetBoard = currentDataGetBoard;

  const [dataGetBoard, setDataGetBoard] = useState<
    undefined | BoardFromServerExpanded
  >(currentDataGetBoard);

  let columnsJSX: React.ReactElement[] | React.ReactElement;
  if (dataGetBoard && dataGetBoard.columns.length !== 0) {
    const columnsArr = dataGetBoard.columns.map((column, index) => {
      const tasksArr = column.tasks.map((task, index) => (
        <BoardTask
          key={task.id}
          title={task.title}
          // 'done' field is absent in the new BE
          isDone={true}
          user={task.userId}
          id={task.id}
          index={index}
        ></BoardTask>
      ));

      return (
        <Draggable key={column.id} draggableId={column.id} index={index}>
          {(provided) => (
            <BoardColumn
              title={column.title}
              innerRef={provided.innerRef}
              dragHandleProps={provided.dragHandleProps}
              draggableProps={provided.draggableProps}
              id={column.id}
            >
              {tasksArr}
            </BoardColumn>
          )}
        </Draggable>
      );
    });

    columnsJSX = (
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="columns-wrapper"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columnsArr}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  } else if (dataGetBoard && dataGetBoard.columns.length === 0) {
    columnsJSX = (
      <Stack width="100%" textAlign="center">
        <Typography fontSize="2rem" color="primary.light">
          {t('No columns yet')}
        </Typography>
      </Stack>
    );
  } else if (isErrorGetBoard) {
    throw new Error(`boardId is invalid`);
  } else {
    columnsJSX = <p>Loading</p>;
  }

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
        <Stack
          direction="row"
          sx={{
            scrollbarColor: `${grey[400]} ${grey[200]}`,
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              height: '10px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: grey[200],
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: grey[400],
            },
          }}
        >
          {columnsJSX}
        </Stack>
      </Stack>
    </DragDropContext>
  );
}

export default BoardPage;
