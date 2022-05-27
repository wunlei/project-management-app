import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import BoardTask from 'components/BoardTask/BoardTask';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import grey from '@mui/material/colors/grey';

function BoardPage() {
  const { t } = useTranslation();
  const columns = [1];
  const boardId = '7bc29317-6a28-4e2c-883e-341d8057dd64';
  const columnId = 'c38f6f8b-d28b-4da5-81de-c34f9d319318';

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
            columnData={{
              boardId,
              columnId,
              body: {
                title: 'ColumnTitle',
                order: 1,
              },
            }} // boardId={boardId}
            // columnId={columnId}
            // title={'Column Title'}
          >
            <BoardTask title={'Title'} user={'W'}></BoardTask>
          </BoardColumn>
        )}
      </Stack>
    </Stack>
  );
}

export default BoardPage;
