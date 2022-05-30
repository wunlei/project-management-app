import { DropResult } from 'react-beautiful-dnd';
import {
  BoardFromServerExpanded,
  ColumnFromServerExpended,
  TaskFromServer,
  UpdateTaskArg,
  UpdateColumnArg,
} from 'redux/api/apiTypes';

interface GetOnDragEndProps {
  dataGetBoard?: BoardFromServerExpanded;
  updateTask: (arg: UpdateTaskArg) => void;
  updateColumn: (arg: UpdateColumnArg) => void;
  setDataGetBoard: (state: BoardFromServerExpanded | undefined) => void;
}

export default function getOnDragEnd({
  dataGetBoard,
  updateTask,
  updateColumn,
  setDataGetBoard,
}: GetOnDragEndProps) {
  return function (result: DropResult) {
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

        // sync change

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
            userId: relatedTask.userId,
          },
        });

        // sync change

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
}
