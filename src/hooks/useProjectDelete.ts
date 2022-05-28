import { useEffect } from 'react';
import { useDeleteBoardMutation } from 'redux/api/endpoints/boards';
import { setAlertState } from 'redux/global/globalSlice';
import { useAppDispatch } from 'redux/hooks';

interface Props {
  boardId: string | null;
  handleSuccessfulDelete: () => void;
}

function useProjectDelete({ boardId, handleSuccessfulDelete }: Props) {
  const dispatch = useAppDispatch();

  const [deleteBoard, deleteBoardResult] = useDeleteBoardMutation();

  const handleDelete = () => {
    if (boardId) {
      deleteBoard({ boardId });
      handleSuccessfulDelete();
    }
  };

  useEffect(() => {
    if (deleteBoardResult.isSuccess) {
      dispatch(
        setAlertState({
          alertMessage: 'Project successfully deleted',
          alertType: 'success',
        })
      );
    }
    if (deleteBoardResult.isError) {
      dispatch(
        setAlertState({
          alertMessage: 'Something went wrong!',
          alertType: 'error',
        })
      );
    }
  }, [deleteBoardResult.isSuccess, deleteBoardResult.isError, dispatch]);

  return {
    handleDelete,
    deleteBoardResult,
  };
}

export default useProjectDelete;
