import { useState, useEffect } from 'react';
import { TaskFromServerExpanded } from 'redux/api/apiTypes';
import { useAppDispatch } from 'redux/hooks';
import { setAlertState } from 'redux/global/globalSlice';

import { useDeleteTaskMutation } from 'redux/api/endpoints/tasks';

function useDeleteTask(task: TaskFromServerExpanded | null) {
  // const { boardId, id: taskId, columnId } = task;

  const dispatch = useAppDispatch();
  const [deleteTask, deleteTaskResult] = useDeleteTaskMutation();
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const handleDeleteTask = () => {
    if (task) {
      deleteTask({
        boardId: task.boardId,
        columnId: task.columnId,
        taskId: task.id,
      });
    }
  };

  const handleToggleDeleteDialog = () => {
    setIsConfirmationDialogOpen(!isConfirmationDialogOpen);
  };

  useEffect(() => {
    if (deleteTaskResult.isSuccess) {
      dispatch(
        setAlertState({
          alertMessage: 'Task deleted successfuly!',
          alertType: 'success',
        })
      );
    }
    if (deleteTaskResult.isError) {
      dispatch(
        setAlertState({
          alertMessage: 'Something went wrong!',
          alertType: 'success',
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTaskResult.isError, deleteTaskResult.isSuccess]);

  return {
    handleDeleteTask,
    handleToggleDeleteDialog,
    isTaskDeleteDialogOpen: isConfirmationDialogOpen,
    isDeleteTaskLoading: deleteTaskResult.isLoading,
  };
}

export default useDeleteTask;
