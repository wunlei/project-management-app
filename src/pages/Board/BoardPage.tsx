import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import BoardTask from 'components/BoardTask/BoardTask';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import grey from '@mui/material/colors/grey';
import { useGetBoardQuery } from 'redux/api/endpoints/boards';

function BoardPage() {
  const { t } = useTranslation();

  const { boardId } = useParams();
  if (!boardId) {
    throw new Error('boardId (url param) is absent');
  }

  const { currentData: dataGetBoard, isError: isErrorGetBoard } =
    useGetBoardQuery({ boardId });

  let columnsJSX: React.ReactElement[] | React.ReactElement;
  if (dataGetBoard && dataGetBoard.columns.length !== 0) {
    columnsJSX = dataGetBoard.columns.map((column) => {
      const tasksJSX = column.tasks.map((task) => (
        <BoardTask
          key={task.id}
          title={task.title}
          // 'done' field is absent in the new BE
          isDone={true}
          user={task.userId}
        ></BoardTask>
      ));

      return (
        <BoardColumn key={column.id} title={column.title}>
          {tasksJSX}
        </BoardColumn>
      );
    });
  } else if (dataGetBoard && dataGetBoard.columns.length === 0) {
    columnsJSX = (
      <Stack width="100%" textAlign="center">
        <Typography fontSize="2rem" color="primary.light">
          {t('No columns yet')}
        </Typography>
      </Stack>
    );
  } else if (isErrorGetBoard) {
    throw new Error(`boardId is invalid`);
  } else {
    columnsJSX = <p>Loading</p>;
  }

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
          <Typography variant="h4">
            {dataGetBoard && dataGetBoard.title}
          </Typography>
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
        {columnsJSX}
      </Stack>
    </Stack>
  );
}

export default BoardPage;
