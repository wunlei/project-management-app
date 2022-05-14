import { Link } from 'react-router-dom';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import BoardTask from 'components/BoardTask/BoardTask';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import grey from '@mui/material/colors/grey';

function BoardPage() {
  return (
    <Stack height="100vh">
      <Stack
        component="main"
        spacing={1}
        padding="1rem"
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
              Add Column
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
          <BoardColumn title={'Column Title'}>
            <BoardTask
              title={'Title'}
              description={''}
              isDone={false}
              user={'W'}
            ></BoardTask>
          </BoardColumn>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default BoardPage;
