import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import BoardTask from 'components/BoardTask/BoardTask';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import grey from '@mui/material/colors/grey';
import { useState } from 'react';
import { TaskFromServerExpanded } from 'redux/api/apiTypes';
import EditTaskFormModal from 'components/TaskForms/EditTaskForm';

function BoardPage() {
  const { t } = useTranslation();

  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskFromServerExpanded>({
    id: '',
    userId: null,
    title: '',
    order: 0,
    description: '',
    files: [],
    boardId: '',
    columnId: '',
  });

  const handleToggleEditTaskModal = () => {
    setIsEditTaskModalOpen(!isEditTaskModalOpen);
  };

  const handleSelectTask = (task: TaskFromServerExpanded) => {
    setSelectedTask(task);
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
      <EditTaskFormModal
        task={selectedTask}
        handleClose={handleToggleEditTaskModal}
        open={isEditTaskModalOpen}
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
          >
            <BoardTask
              title={'Title'}
              isDone={true}
              user={'W'}
              task={task}
              handleSelectTask={handleSelectTask}
              handleToggleEditTaskModal={handleToggleEditTaskModal}
            ></BoardTask>
          </BoardColumn>
        )}
      </Stack>
    </Stack>
  );
}

export default BoardPage;
