import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { useGetBoardQuery } from 'redux/api/endpoints/boards';
import { DragDropContext } from 'react-beautiful-dnd';
import { useUpdateTaskMutation } from 'redux/api/endpoints/tasks';
import { useUpdateColumnMutation } from 'redux/api/endpoints/columns';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import getOnDragEnd from './getOnDragEnd';
import MemoizedColumnsContainer from './MemoizedColumnsContainer';
import useCreateTask from 'hooks/useCreateTask';
import useEditTask from 'hooks/useEditTask';
import useDeleteTask from 'hooks/useDeleteTask';
import useColumnDelete from 'hooks/useColumnDelete';
import CreateColumnForm from 'components/CreateColumnFrom/CreateColumnForm';
import EditTaskFormModal from 'components/TaskForms/EditTaskForm';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';
import CreateTaskFormModal from 'components/TaskForms/CreateTaskForm';
import { TaskFromServerExpanded } from 'redux/api/apiTypes';
import { TaskCallback } from 'components/BoardTask/BoardTask.types';
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';
import { useAppDispatch } from 'redux/hooks';
import { setUsersState } from 'redux/global/globalSlice';

function BoardPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  if (!boardId) {
    throw new Error('boardId (url param) is absent');
  }

  const [selectedColumnId, setSelectedColumnId] = useState('');

  const handleSelectColumnId = (columnId: string) => {
    setSelectedColumnId(columnId);
  };

  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const [selectedTask, setSelectedTask] =
    useState<TaskFromServerExpanded | null>(null);
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);

  // Delete column
  const [isColumnDeleteConfirmOpen, setIsColumnDeleteConfirmOpen] =
    useState<boolean>(false);

  const handleColumnDeleteSuccess = () => {
    setIsColumnDeleteConfirmOpen(false);
  };

  const { handleColumnDelete, deleteColumnResult } = useColumnDelete({
    boardId,
    columnId: selectedColumnId,
    handleColumnDeleteSuccess,
  });

  // Delete Task
  const {
    handleTaskDeleteDialogToggle,
    handleTaskDelete,
    isTaskDeleteDialogOpen,
    isDeleteTaskLoading,
  } = useDeleteTask(selectedTask);

  const handleTaskDeleteConfirmOpen: TaskCallback = (
    task: TaskFromServerExpanded
  ) => {
    setSelectedTask(task);
    handleTaskDeleteDialogToggle();
  };

  // Edit Task
  const { isEditTaskModalOpen, handleTaskEditModalToggle } = useEditTask();

  const handleTaskEditModalOpen: TaskCallback = (task) => {
    setSelectedTask(task);
    handleTaskEditModalToggle();
  };

  const handleTaskEditModalClose = () => {
    setSelectedTask(null);
    handleTaskEditModalToggle();
  };

  // Create Task
  const { handleTaskCreateModalToggle, isCreateTaskModalOpen } =
    useCreateTask();

  useEffect(() => {
    setIsLoadingAction(isDeleteTaskLoading || deleteColumnResult.isLoading);
  }, [isDeleteTaskLoading, deleteColumnResult.isLoading]);

  // D-n-D

  const [updateColumn] = useUpdateColumnMutation();
  const [updateTask] = useUpdateTaskMutation();

  const {
    currentData: currentDataGetBoard,
    isError: isErrorGetBoard,
    isFetching: isFetchingGetBoard,
    isLoading: isLoadingGetBoard,
  } = useGetBoardQuery({ boardId });

  const [dataGetBoard, setDataGetBoard] = useState<
    undefined | BoardFromServerExpanded
  >(currentDataGetBoard);

  const onDragEnd = getOnDragEnd({
    dataGetBoard,
    updateTask,
    updateColumn,
    setDataGetBoard,
  });

  //users

  const { data: users } = useGetAllUsersQuery();

  useEffect(() => {
    if (users) {
      dispatch(setUsersState(users));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    setDataGetBoard(currentDataGetBoard);
  }, [currentDataGetBoard]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        component="main"
        padding="1rem"
        sx={{
          paddingTop: {
            xs: '165px',
            sm: '120px',
          },
          paddingBottom: {
            xs: '94px',
            sm: '54px',
          },
        }}
        height={'calc(100vh - 17px)'}
        flex={1}
      >
        <Backdrop
          sx={{
            zIndex: 2000,
          }}
          open={isLoadingGetBoard || isLoadingAction}
        >
          <CircularProgress color="secondary" size={100} />
        </Backdrop>

        {dataGetBoard && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            component="nav"
            flexWrap="wrap"
            sx={{
              position: 'fixed',
              top: '64px',
              left: 0,
              width: '100%',
              padding: '0.5rem 0.625rem',
              backgroundColor: 'white',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'primary.main',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Link to={'/projects'}>
                <IconButton color="primary">
                  <ArrowIcon />
                </IconButton>
              </Link>
              <Typography
                title={dataGetBoard.title}
                variant="h4"
                sx={{
                  maxWidth: {
                    xs: '250px',
                    sm: '380px',
                  },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {dataGetBoard.title}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                variant="contained"
                startIcon={<PlusIcon />}
                onClick={() => {
                  setIsCreateColumnModalOpen(true);
                }}
              >
                {t('Add Column')}
              </Button>
            </Stack>
          </Stack>
        )}
        <MemoizedColumnsContainer
          dataGetBoard={dataGetBoard}
          isErrorGetBoard={isErrorGetBoard}
          isFetchingGetBoard={isFetchingGetBoard}
          boardId={boardId}
          setIsColumnDeleteConfirmOpen={() => {
            setIsColumnDeleteConfirmOpen(true);
          }}
          handleSelectColumnId={handleSelectColumnId}
          handleTaskEditModalOpen={handleTaskEditModalOpen}
          handleTaskDeleteConfirmOpen={handleTaskDeleteConfirmOpen}
          handleCreateTaskModalOpen={handleTaskCreateModalToggle}
        />
      </Stack>
      <ConfirmationDialog
        open={isColumnDeleteConfirmOpen}
        dialogText={t(
          'You are about to permanently delete column. This action cannot be undone.'
        )}
        title={t('Delete column')}
        onReject={() => {
          setIsColumnDeleteConfirmOpen(false);
        }}
        onConfirm={handleColumnDelete}
      />
      <CreateColumnForm
        open={isCreateColumnModalOpen}
        onClose={() => {
          setIsCreateColumnModalOpen(false);
        }}
        boardId={boardId}
      />
      <ConfirmationDialog
        open={isTaskDeleteDialogOpen}
        dialogText={t(
          'You are about to permanently delete task. This action cannot be undone.'
        )}
        title={t('Delete task')}
        onConfirm={() => {
          handleTaskDelete();
          handleTaskDeleteDialogToggle();
          setSelectedTask(null);
        }}
        onReject={handleTaskDeleteDialogToggle}
      />
      <EditTaskFormModal
        task={selectedTask}
        handleClose={handleTaskEditModalClose}
        open={isEditTaskModalOpen}
      />
      <CreateTaskFormModal
        open={isCreateTaskModalOpen}
        handleClose={handleTaskCreateModalToggle}
        columnId={selectedColumnId}
        boardId={boardId}
      />
    </DragDropContext>
  );
}

export default BoardPage;
