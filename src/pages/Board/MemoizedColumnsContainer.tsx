import React from 'react';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import BoardTask from 'components/BoardTask/BoardTask';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import { Stack, Typography } from '@mui/material';
import grey from '@mui/material/colors/grey';
import { useTranslation } from 'react-i18next';

function ColumnsContainer({
  dataGetBoard,
  isErrorGetBoard,
}: {
  dataGetBoard: BoardFromServerExpanded | undefined;
  isErrorGetBoard: boolean;
}) {
  const { t } = useTranslation();

  if (dataGetBoard && dataGetBoard.columns.length !== 0) {
    const columnsJSX = dataGetBoard.columns.map((column, index) => {
      const tasksJSX = column.tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <BoardTask
              task={task}
              draggableProps={provided.draggableProps}
              dragHandleProps={provided.dragHandleProps}
              innerRef={provided.innerRef}
            ></BoardTask>
          )}
        </Draggable>
      ));

      return (
        <Draggable key={column.id} draggableId={column.id} index={index}>
          {(provided) => (
            <BoardColumn
              title={column.title}
              id={column.id}
              draggableProps={provided.draggableProps}
              dragHandleProps={provided.dragHandleProps}
              innerRef={provided.innerRef}
            >
              {tasksJSX}
            </BoardColumn>
          )}
        </Draggable>
      );
    });

    return (
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            direction="row"
            spacing={1}
            sx={{
              flexGrow: 1,
              overflowY: 'hidden',
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
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    );
  } else if (dataGetBoard && dataGetBoard.columns.length === 0) {
    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexGrow: 1,
          overflowY: 'hidden',
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
        <Stack width="100%" textAlign="center">
          <Typography fontSize="2rem" color="primary.light">
            {t('No columns yet')}
          </Typography>
        </Stack>
      </Stack>
    );
  } else if (isErrorGetBoard) {
    throw new Error(`boardId is invalid`);
  } else {
    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexGrow: 1,
          overflowY: 'hidden',
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
        <p>Loading</p>
      </Stack>
    );
  }
}

export default React.memo(ColumnsContainer);
