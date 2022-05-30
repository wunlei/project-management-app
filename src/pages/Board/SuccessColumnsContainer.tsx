import { Draggable, Droppable } from 'react-beautiful-dnd';
import BoardTask from 'components/BoardTask/BoardTask';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import { Stack } from '@mui/material';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import { BoardColumnProps } from 'components/BoardColumn/BoardColumn.types';
import { BoardTaskProps } from 'components/BoardTask/BoardTask.types';
import { useAppSelector } from 'redux/hooks';

export interface SuccessColumnsContainerProps
  extends Pick<
      BoardColumnProps,
      | 'setIsColumnDeleteConfirmOpen'
      | 'handleSelectColumnId'
      | 'handleCreateTaskModalOpen'
    >,
    Pick<
      BoardTaskProps,
      'handleTaskEditModalOpen' | 'handleTaskDeleteConfirmOpen'
    > {
  boardId: string;
  dataGetBoard: BoardFromServerExpanded;
}

function SuccessColumnsContainer(props: SuccessColumnsContainerProps) {
  const {
    dataGetBoard,
    setIsColumnDeleteConfirmOpen,
    handleSelectColumnId,
    handleTaskEditModalOpen,
    handleTaskDeleteConfirmOpen,
    handleCreateTaskModalOpen,
  } = props;

  const users = useAppSelector((state) => state.global.users);

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
          {dataGetBoard.columns.map((column, index) => (
            <Draggable key={column.id} draggableId={column.id} index={index}>
              {(provided) => (
                <BoardColumn
                  draggableProps={provided.draggableProps}
                  dragHandleProps={provided.dragHandleProps}
                  innerRef={provided.innerRef}
                  columnData={{
                    boardId: dataGetBoard.id,
                    columnId: column.id,
                    body: {
                      title: column.title,
                      order: column.order,
                    },
                  }}
                  setIsColumnDeleteConfirmOpen={setIsColumnDeleteConfirmOpen}
                  handleSelectColumnId={handleSelectColumnId}
                  handleCreateTaskModalOpen={handleCreateTaskModalOpen}
                >
                  {column.tasks.map((task, index) => {
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <BoardTask
                            task={{
                              ...task,
                              boardId: dataGetBoard.id,
                              columnId: column.id,
                            }}
                            user={
                              task.userId
                                ? users[task.userId]
                                  ? users[task.userId].login
                                  : ''
                                : ''
                            }
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                            innerRef={provided.innerRef}
                            handleTaskEditModalOpen={handleTaskEditModalOpen}
                            handleTaskDeleteConfirmOpen={
                              handleTaskDeleteConfirmOpen
                            }
                          ></BoardTask>
                        )}
                      </Draggable>
                    );
                  })}
                </BoardColumn>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Stack>
      )}
    </Droppable>
  );
}

export default SuccessColumnsContainer;
