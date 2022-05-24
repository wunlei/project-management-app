import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import BoardTask from 'components/BoardTask/BoardTask';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import { Stack, Typography } from '@mui/material';
import grey from '@mui/material/colors/grey';

export default function createColumnsContainer({
  dataGetBoard,
  isErrorGetBoard,
  textAddColumn,
}: {
  dataGetBoard: BoardFromServerExpanded | undefined;
  isErrorGetBoard: boolean;
  textAddColumn: string;
}) {
  let JSX: React.ReactElement;

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

    JSX = (
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
    JSX = (
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
            {textAddColumn}
          </Typography>
        </Stack>
      </Stack>
    );
  } else if (isErrorGetBoard) {
    throw new Error(`boardId is invalid`);
  } else {
    JSX = (
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

  return JSX;
}
