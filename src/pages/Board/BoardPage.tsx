import { Button, IconButton, Stack, Typography } from '@mui/material';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-left-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import BoardColumn from 'components/BoardColumn/BoardColumn';
import BoardTask from 'components/BoardTask/BoardTask';
import { Link } from 'react-router-dom';

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
          p="10px"
          flexWrap="wrap"
          sx={{
            border: '1px solid',
            borderColor: 'primary.main',
            borderRadius: '0.875rem',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Link to={'/projects'}>
              <IconButton color="primary">
                <ArrowIcon />
              </IconButton>
            </Link>
            <Typography variant="h3">{'Project Title'}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button variant="contained" startIcon={<PlusIcon />}>
              Add Column
            </Button>
            <Button variant="contained" startIcon={<PlusIcon />}>
              Add Task
            </Button>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexGrow: 1,
            overflowY: 'hidden',
          }}
        >
          <BoardColumn>
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
