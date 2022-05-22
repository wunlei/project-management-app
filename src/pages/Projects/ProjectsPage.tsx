import { Box, Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import SearchBar from 'components/SearchBar/SearchBar';
import {
  useGetAllBoardsQuery,
  useDeleteBoardMutation,
} from 'redux/api/endpoints/boards';

function ProjectsPage() {
  const { t } = useTranslation();

  const [deleteBoard, { isError: isErrorDeleteBoard }] =
    useDeleteBoardMutation();
  const { currentData: dataGetAllBoards, isError: isErrorGetAllBoards } =
    useGetAllBoardsQuery();

  if (isErrorDeleteBoard) {
    throw new Error('deleting a board');
  }

  let boardsJSX: React.ReactElement[] | React.ReactElement;
  if (dataGetAllBoards) {
    boardsJSX = dataGetAllBoards.map(({ id, title, description }) => (
      <ProjectCard
        key={id}
        title={title}
        description={description}
        boardId={id}
        onDelete={() => deleteBoard({ boardId: id })}
      ></ProjectCard>
    ));
  } else if (isErrorGetAllBoards) {
    throw new Error('fetching all boards');
  } else {
    boardsJSX = <p>Loading</p>;
  }

  return (
    <Container component="main" sx={{ flexGrow: 1 }}>
      <Stack spacing={3}>
        <Typography variant="h3" fontWeight="bold">
          {t('Projects')}
        </Typography>
        <SearchBar />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '1rem',
            rowGap: '1rem',
          }}
        >
          {boardsJSX}
        </Box>
      </Stack>
    </Container>
  );
}

export default ProjectsPage;
