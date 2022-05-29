import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import useCreateTask from 'hooks/useCreateTask';
import useEditTask from 'hooks/useEditTask';
import useDeleteTask from 'hooks/useDeleteTask';
import useColumnDelete from 'hooks/useColumnDelete';
import BoardTask from 'components/BoardTask/BoardTask';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import CreateColumnForm from 'components/CreateColumnFrom/CreateColumnForm';
import EditTaskFormModal from 'components/TaskForms/EditTaskForm';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';
import CreateTaskFormModal from 'components/TaskForms/CreateTaskForm';
import { TaskFromServerExpanded } from 'redux/api/apiTypes';
import { TaskCallback } from 'components/BoardTask/BoardTask.types';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import grey from '@mui/material/colors/grey';
import scrollStyle from 'styles/scrollStyle';

function BoardPage() {
  const { t } = useTranslation();
  const columns = [1];
  const boardId = '7bc29317-6a28-4e2c-883e-341d8057dd64';
  const columnId = 'c38f6f8b-d28b-4da5-81de-c34f9d319318';
  const task = {
    id: '2c83ad14-9703-4d44-a654-32758f71e957',
    title: 'asdsad',
    order: 12,
    description: ' ',
    userId: '3d0b6961-4f27-485e-8626-d028e7b1d147',
    files: [],
    boardId,
    columnId,
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
    columnId,
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
  const {
    handleSelectColumnId,
    selectedColumnId,
    handleTaskCreateModalToggle,
    isCreateTaskModalOpen,
  } = useCreateTask();

  useEffect(() => {
    setIsLoadingAction(isDeleteTaskLoading || deleteColumnResult.isLoading);
  }, [isDeleteTaskLoading, deleteColumnResult.isLoading]);

  return (
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
          <Typography variant="h4">{'Project Title'}</Typography>
        </Stack>
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
      <Stack
        direction="row"
        spacing={1}
        sx={[
          {
            opacity: isLoadingAction ? 0.5 : 1,
            pointerEvents: isLoadingAction ? 'none' : 'auto',
            flexGrow: 1,
            overflowY: 'hidden',
          },
          ...(Array.isArray(scrollStyle) ? scrollStyle : [scrollStyle]),
        ]}
      >
        {columns.length === 0 ? (
          <Stack width="100%" textAlign="center">
            <Typography fontSize="2rem" color="primary.light">
              {t('No columns yet')}
            </Typography>
          </Stack>
        ) : (
          <BoardColumn
            columnData={{
              boardId,
              columnId,
              body: {
                title: 'ColumnTitle',
                order: 1,
              },
            }}
            setIsColumnDeleteConfirmOpen={(value) => {
              setIsColumnDeleteConfirmOpen(value);
            }}
            handleSelectColumnId={handleSelectColumnId}
          >
            <BoardTask
              title={'Title'}
              user={'W'}
              task={task}
              handleOpenEditModal={handleTaskEditModalOpen}
              handleOpenDeleteConfirmation={handleTaskDeleteConfirmOpen}
            />
          </BoardColumn>
        )}
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
    </Stack>
  );
}

export default BoardPage;
