import { useEffect } from 'react';
import { useDeleteColumnMutation } from 'redux/api/endpoints/columns';
import { setAlertState } from 'redux/global/globalSlice';
import { useAppDispatch } from 'redux/hooks';

interface Props {
  boardId: string | null;
  columnId: string | null;
  handleColumnDeleteSuccess: () => void;
}

function useColumnDelete({
  boardId,
  columnId,
  handleColumnDeleteSuccess,
}: Props) {
  const dispatch = useAppDispatch();

  const [deleteColumn, deleteColumnResult] = useDeleteColumnMutation();

  const handleColumnDelete = () => {
    if (boardId && columnId) {
      deleteColumn({ boardId, columnId });
      handleColumnDeleteSuccess();
    }
  };

  useEffect(() => {
    if (deleteColumnResult.isSuccess) {
      dispatch(
        setAlertState({
          alertMessage: 'Project successfully deleted',
          alertType: 'success',
        })
      );
    }
    if (deleteColumnResult.isError) {
      dispatch(
        setAlertState({
          alertMessage: 'Something went wrong!',
          alertType: 'error',
        })
      );
    }
  }, [deleteColumnResult.isSuccess, deleteColumnResult.isError, dispatch]);

  return {
    handleColumnDelete,
    deleteColumnResult,
  };
}

export default useColumnDelete;
