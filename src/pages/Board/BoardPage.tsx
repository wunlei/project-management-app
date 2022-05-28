import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetBoardQuery } from 'redux/api/endpoints/boards';
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';
import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import BoardTask from 'components/BoardTask/BoardTask';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import scrollStyle from 'styles/scrollStyle';

function BoardPage() {
  const { t } = useTranslation();
  let { boardId } = useParams();
  const navigate = useNavigate();
  // const columns = [1];
  // const boardId = '7bc29317-6a28-4e2c-883e-341d8057dd64';
  // const columnId = 'c38f6f8b-d28b-4da5-81de-c34f9d319318';
  if (!boardId) {
    navigate('/404');
    boardId = 'null';
  }
  const { data: users } = useGetAllUsersQuery();

  const {
    currentData: boardData,
    isError,
    isLoading,
  } = useGetBoardQuery({ boardId });

  useEffect(() => {
    if (isError) {
      navigate('/404');
    }
  }, [isError, navigate]);

  const columns = boardData?.columns || [];

  return (
    <Stack
      component="main"
      spacing={1}
      padding="1rem"
      paddingTop="0"
      sx={{ overflow: 'hidden' }}
      flex={1}
    >
      {isLoading && (
        <Stack alignItems="center">
          <CircularProgress size={100} thickness={5} />
        </Stack>
      )}
      {boardData && (
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
            <Typography variant="h4" sx={{ overflowWrap: 'anywhere' }}>
              {boardData.title}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button variant="contained" startIcon={<PlusIcon />}>
              {t('Add Column')}
            </Button>
          </Stack>
        </Stack>
      )}
      {boardData && (
        <Stack
          direction="row"
          spacing={1}
          sx={[
            {
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
            columns.map((column) => (
              <BoardColumn
                key={column.id}
                columnData={{
                  boardId: boardData.id,
                  columnId: column.id,
                  body: {
                    title: column.title,
                    order: column.order,
                  },
                }}
              >
                {column.tasks.map((task) => {
                  const user = users?.filter((el) => el.id === task.userId);
                  return (
                    <BoardTask
                      key={task.id}
                      title={task.title}
                      user={user ? user[0].name[0] : ''}
                    ></BoardTask>
                  );
                })}
              </BoardColumn>
            ))
          )}
        </Stack>
      )}
    </Stack>
  );
}

export default BoardPage;
