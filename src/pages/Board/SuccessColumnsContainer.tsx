import { Draggable, Droppable } from 'react-beautiful-dnd';
import BoardTask from 'components/BoardTask/BoardTask';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import { Stack } from '@mui/material';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';

export default function SuccessColumnsContainer({
  dataGetBoard,
}: {
  dataGetBoard: BoardFromServerExpanded;
}) {
  const columnsJSX = dataGetBoard.columns.map((column, index) => {
    const tasksJSX = column.tasks.map((task, index) => (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <BoardTask
            task={{ ...task, boardId: dataGetBoard.id, columnId: column.id }}
            draggableProps={provided.draggableProps}
            dragHandleProps={provided.dragHandleProps}
            isDragging={snapshot.isDragging}
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
            width: 'fit-content',
            overflowY: 'hidden',
          }}
        >
          {columnsJSX}
          {provided.placeholder}
        </Stack>
      )}
    </Droppable>
  );
}
