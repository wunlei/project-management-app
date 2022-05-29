import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TaskFromServerExpanded } from 'redux/api/apiTypes';

import { Link } from 'react-router-dom';
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import BoardTask from 'components/BoardTask/BoardTask';
import EditTaskFormModal from 'components/TaskForms/EditTaskForm';
import CreateTaskFormModal from 'components/TaskForms/CreateTaskForm';

import { TaskCallback } from 'components/BoardTask/BoardTask.types';
import CreateColumnForm from 'components/CreateColumnFrom/CreateColumnForm';

import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import grey from '@mui/material/colors/grey';

import useEditTask from 'hooks/useEditTask';
import useDeleteTask from 'hooks/useDeleteTask';
import useCreateTask from 'hooks/useCreateTask';

function BoardPage() {
  const { t } = useTranslation();

  const [selectedTask, setSelectedTask] =
    useState<TaskFromServerExpanded | null>(null);

  const {
    handleSelectColumnId,
    selectedColumnId,
    handleToggleCreateTaskModal,
    isCreateTaskModalOpen,
  } = useCreateTask();

  const { isEditTaskModalOpen, handleToggleEditTaskModal } = useEditTask();

  const {
    handleToggleDeleteDialog,
    handleDeleteTask,
    isTaskDeleteDialogOpen,
    isDeleteTaskLoading,
  } = useDeleteTask(selectedTask);

  const handleOpenEditModal: TaskCallback = (task) => {
    setSelectedTask(task);
    handleToggleEditTaskModal();
  };

  const handleCloseEditModal = () => {
    setSelectedTask(null);
    handleToggleEditTaskModal();
  };

  const handleOpenDeleteConfirmation: TaskCallback = (
    task: TaskFromServerExpanded
  ) => {
    setSelectedTask(task);
    handleToggleDeleteDialog();
  };
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);

  const columns = [1];
  const boardId = '2bc55381-8502-4ed3-987d-c6b0972c0c7d';
  const columnId = 'e9c9f088-952b-4c7b-af11-ad4ce0b06d7e';
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
  return (
    <Stack
      component="main"
      spacing={1}
      padding="1rem"
      paddingTop="0"
      sx={{ overflow: 'hidden' }}
      flex={1}
    >
      <Backdrop
        sx={{
          zIndex: 2000,
        }}
        open={isDeleteTaskLoading}
      >
        <CircularProgress color="secondary" size={100} />
      </Backdrop>
      <ConfirmationDialog
        open={isTaskDeleteDialogOpen}
        dialogText={t(
          'You are about to permanently delete task. This action cannot be undone.'
        )}
        title={t('Delete task')}
        onConfirm={() => {
          handleDeleteTask();
          handleToggleDeleteDialog();
          setSelectedTask(null);
        }}
        onReject={handleToggleDeleteDialog}
      />
      <EditTaskFormModal
        task={selectedTask}
        handleClose={handleCloseEditModal}
        open={isEditTaskModalOpen}
      />
      <CreateTaskFormModal
        open={isCreateTaskModalOpen}
        handleClose={handleToggleCreateTaskModal}
        columnId={selectedColumnId}
        boardId={boardId}
      />
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
        {columns.length === 0 ? (
          <Stack width="100%" textAlign="center">
            <Typography fontSize="2rem" color="primary.light">
              {t('No columns yet')}
            </Typography>
          </Stack>
        ) : (
          <BoardColumn
            boardId={boardId}
            columnId={columnId}
            title={'Column Title'}
            handleSelectColumnId={handleSelectColumnId}
          >
            <BoardTask
              title={'Title'}
              isDone={true}
              user={'W'}
              task={task}
              handleOpenEditModal={handleOpenEditModal}
              handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}
            />
          </BoardColumn>
        )}
      </Stack>
      <CreateColumnForm
        open={isCreateColumnModalOpen}
        onClose={() => {
          setIsCreateColumnModalOpen(false);
        }}
        boardId={boardId}
      />
    </Stack>
  );
}

export default BoardPage;
