import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TaskFromServerExpanded } from 'redux/api/apiTypes';

import { Link } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import BoardTask from 'components/BoardTask/BoardTask';
import EditTaskFormModal from 'components/TaskForms/EditTaskForm';

import { TaskCallback } from 'components/BoardTask/BoardTask.types';

import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import grey from '@mui/material/colors/grey';
import { emptyTask } from 'constants/defautlts';
import useEditTask from './useEditTask';
import useDeleteTask from './useDeleteTask';
import CreateTaskFormModal from 'components/TaskForms/CreateTaskForm';
import useCreateTask from './useCreateTask';

function BoardPage() {
  const { t } = useTranslation();

  const [selectedTask, setSelectedTask] =
    useState<TaskFromServerExpanded>(emptyTask);

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
    isConfirmationDialogOpen,
  } = useDeleteTask(selectedTask);

  const handleOpenEditModal: TaskCallback = (task) => {
    setSelectedTask(task);
    handleToggleEditTaskModal();
  };

  const handleOpenDeleteConfirmation: TaskCallback = (
    task: TaskFromServerExpanded
  ) => {
    setSelectedTask(task);
    handleToggleDeleteDialog();
  };

  const columns = [1];
  const boardId = '7bc29317-6a28-4e2c-883e-341d8057dd64';
  const columnId = 'b0c652d7-a226-4d9a-b3c9-d06aa60ee085';
  const task = {
    id: '680d0e89-5831-496a-bed1-de0789355651',
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
      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        dialogText={t(
          'You are about to permanently delete task. This action cannot be undone.'
        )}
        title={t('Delete task')}
        onConfirm={() => {
          handleDeleteTask();
          handleToggleDeleteDialog();
          setSelectedTask(emptyTask);
        }}
        onReject={handleToggleDeleteDialog}
      />
      <EditTaskFormModal
        task={selectedTask}
        handleClose={handleToggleEditTaskModal}
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
          <Button variant="contained" startIcon={<PlusIcon />}>
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
            ></BoardTask>
          </BoardColumn>
        )}
      </Stack>
    </Stack>
  );
}

export default BoardPage;
